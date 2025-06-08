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
  Badge,
  Divider,
  Text,
} from "@mantine/core";
import { IconSend, IconSearch } from "@tabler/icons-react";

const MAX_FILE_SIZE_MB = 5;

export default function ApplicationForm() {
  const [universities, setUniversities] = useState([]);
  const [universityId, setUniversityId] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [programId, setProgramId] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [files, setFiles] = useState({});
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUniversities([
      { value: "1", label: "Kathmandu University", id: 1 },
      { value: "2", label: "Tribhuvan University", id: 2 },
    ]);
  }, []);

  const handleUniversityChange = (uId) => {
    setUniversityId(uId);
    const samplePrograms = [
      {
        id: "101",
        name: "BSc CSIT",
        universityName: "Kathmandu University",
        programRequirements: [
          { name: "Transcript", isMandatory: true },
          { name: "Passport", isMandatory: true },
          { name: "Citizenship", isMandatory: false },
        ],
      },
    ];
    setPrograms(samplePrograms);
  };

  const handleProgramChange = (pId) => {
    setProgramId(pId);
    const selected = programs.find((p) => p.id === pId);
    setSelectedProgram(selected);
  };

  const handleFileChange = (name, file) => {
    if (file && file.size / 1024 / 1024 > MAX_FILE_SIZE_MB) {
      alert("File size should be under 5MB");
      return;
    }
    setFiles((prev) => ({ ...prev, [name]: file }));
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
            data={universities}
            value={universityId || ""}
            onChange={handleUniversityChange}
            searchable
            placeholder="Choose University"
            withAsterisk
          />

          <Select
            label="Select Program"
            data={programs.map((p) => ({ label: p.name, value: p.id }))}
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
              Upload Required Documents
            </Title>
            <Stack spacing="sm">
              {selectedProgram.programRequirements.map((req, idx) => (
                <FileInput
                  key={idx}
                  label={`${req.name} ${req.isMandatory ? "*" : "(Optional)"}`}
                  placeholder="Upload PDF"
                  accept="application/pdf"
                  onChange={(file) => handleFileChange(req.name, file)}
                  withAsterisk={req.isMandatory}
                />
              ))}
            </Stack>
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

    </Stack>
  );
}
