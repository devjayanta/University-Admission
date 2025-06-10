import React, { useEffect, useState } from "react";
import {
  Paper,
  Title,
  Stack,
  Select,
  TextInput,
  FileInput,
  Textarea,
  Group,
  Button,
  Grid,
  Table,
  ActionIcon,
} from "@mantine/core";
import { IconSend, IconTrash, IconUpload, IconEye } from "@tabler/icons-react";
import apiService from "@/app/http/ApiService";
import GLoader from "../GLoader";
import { showAlert, showConfirmAlert } from "../Alert";

const MAX_FILE_SIZE_MB = 5;

export default function ApplicationForm() {
  const [universitiyList, setUniversitiyList] = useState([]);
  const [universityId, setUniversityId] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [programId, setProgramId] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const [docType, setDocType] = useState("");
  const [file, setFile] = useState(null);
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);


  const getUniversities = () => {
    apiService.universityGetAllList().then((response) => {
      setUniversitiyList(
        response?.data?.data?.map((c) => ({
          value: c.id.toString(),
          label: c.name,
        })) || []
      );
    });
  };

  const getDocumentTypes = () => {
    apiService.commonGetAllDocumentTypesList().then(response => {
      setDocumentTypes(
        response?.data?.data?.map((c) => ({
          value: c.id.toString(),
          label: c.name,
        })) || []
      );
    })
  }

  const getUploadedDocuments = () => {
    apiService.userGetAllUserDocumentsList().then(response3 => {
      setUploadedDocs(response3?.data?.data);
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([getUniversities(), getDocumentTypes(), getUploadedDocuments()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleUniversityChange = (uId) => {
    setUniversityId(uId);
    setProgramId(null);
    setSelectedProgram(null);

    setLoading(true);
    apiService.programGetByUniversityIdList({ UniversityId: Number(uId) }).then(response => {
      setPrograms(response?.data?.data);
    }).finally(() => {
      setLoading(false);
    })
  };

  const handleProgramChange = (pId) => {
    setProgramId(pId);
    const selected = programs?.find((p) => p.id === Number(pId));
    setSelectedProgram(selected);
  };

  const handleFileChange = (file) => {
    if (file && file.size / 1024 / 1024 > MAX_FILE_SIZE_MB) {
      alert("File size should be under 5MB");
      return;
    }
    setFile(file);
  };

  const handleAddDocument = () => {
    if (!docType || !file) {
      showAlert("Please select document type and upload a valid file!!", "error")
      return;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      showAlert("File size must be less than 5MB !!", "error");
      return;
    }
    const isAlreadyExists = uploadedDocs?.some(ud => Number(ud.documentId) === Number(docType));
    if (isAlreadyExists) {
      showAlert("This type of file already exists!!", "info");
      setDocType(null);
      setFile(null);
      return;
    }

    setLoading(true);
    apiService.fileCreate({ File: file }).then(response => {
      apiService.userCreateUserDocumentCreate({
        "documentId": Number(docType),
        "value": response?.data?.data
      }).then(response2 => {
        if (response2?.data?.success == true) {
          getUploadedDocuments();
          showAlert("Uploaded Successfully!!", 'success')
          setDocType(null);
          setFile(null);
        }
      })
    }).finally(() => {
      setLoading(false);
    })
  };

  const handleViewPDf = (fileUrl) => {
    window.open(fileUrl, '_blank');
  }

  const handleDelete = (docId) => {
    showConfirmAlert(
      "Are you sure to delete?",
      () => {
        setLoading(true);
        apiService.userDeleteUserDocumentDelete({ Id: Number(docId) }).then((response) => {
          showAlert("Deleted successfully", "success");
          getUploadedDocuments();
        }).finally(() => {
          setLoading(false);
        })
      },
      () => {
        console.log("Delete cancelled");
      }
    );
  };

  const handleSubmitApplication = () => {
    setLoading(true);

  };

  return (
    <Stack spacing="xl">
      <Paper shadow="md" p="lg" radius="md" withBorder>
        <Stack spacing="md">
          <Title order={4} c="blue.9">
            Apply to a Program
          </Title>

          <Select
            label="Select University"
            data={universitiyList}
            value={universityId || ""}
            onChange={handleUniversityChange}
            searchable
            placeholder="Choose University"
            withAsterisk
          />

          <Select
            label="Select Program"
            data={programs.map((p) => ({ label: p.name, value: p.id.toString() }))}
            value={programId || ""}
            onChange={handleProgramChange}
            placeholder="Choose Program"
            searchable
            disabled={!programs.length}
            withAsterisk
          />
        </Stack>
      </Paper>

      {selectedProgram && (
        <>
          <Paper shadow="md" p="lg" radius="md" withBorder>
            <Title order={5} mb="sm" c="blue.9">
              Requirements
            </Title>
            <Stack spacing="sm">
              <TextInput label="GPA:" />
            </Stack>
          </Paper>

          <Paper shadow="md" p="lg" radius="md" withBorder>
            <Title order={5} mb="sm" c="blue.9">
              Upload Required Documents
            </Title>

            <Grid gutter="sm" align="end">
              <Grid.Col span={{ base: 12, sm: 5 }}>
                <Select
                  label="Document Type"
                  data={documentTypes}
                  value={docType}
                  onChange={setDocType}
                  placeholder="Select type"
                  required
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 5 }}>
                <FileInput
                  label="Upload PDF"
                  accept="application/pdf"
                  placeholder="Upload file"
                  value={file}
                  onChange={(file) => handleFileChange(file)}
                  required
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 2 }}>
                <Button
                  fullWidth
                  leftSection={<IconUpload size={16} />}
                  onClick={handleAddDocument}
                  variant="filled"
                  color="blue"
                >
                  Add
                </Button>
              </Grid.Col>
            </Grid>

            {uploadedDocs.length > 0 && (
              <Stack mt="lg" gap="sm">
                <Title order={6} c="blue.8">
                  Uploaded Files
                </Title>
                <Table striped withBorder withColumnBorders>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Document Type</Table.Th>
                      <Table.Th>Action</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {uploadedDocs?.map((doc, index) => (
                      <Table.Tr key={index}>
                        <Table.Td>{doc.documentName}</Table.Td>
                        <Table.Td>
                          <Group gap="xs">
                            <ActionIcon
                              color="blue"
                              variant="light"
                              onClick={() => handleViewPDf(doc.value)}
                              title="View PDF"
                            >
                              <IconEye size={18} />
                            </ActionIcon>
                            <ActionIcon
                              color="red"
                              variant="light"
                              onClick={() => handleDelete(doc.id)}
                              title="Delete"
                            >
                              <IconTrash size={18} />
                            </ActionIcon>
                          </Group>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Stack>
            )}
          </Paper>

          <Paper shadow="md" p="lg" radius="md" withBorder>
            <Title order={5} mb="sm" c="blue.9">
              Additional Information
            </Title>
            <Textarea
              label="Your Message / Special Consideration"
              placeholder="Write any additional info..."
              minRows={3}
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
            />
          </Paper>

          <Group justify="end">
            <Button
              color="blue"
              leftSection={<IconSend size={18} />}
              onClick={handleSubmitApplication}
              loading={loading}
            >
              Submit Application
            </Button>
          </Group>
        </>
      )}

      <GLoader opened={loading} />

    </Stack>
  );
}
