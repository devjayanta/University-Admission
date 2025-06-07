import { useEffect, useRef, useState } from "react";
import {
    Paper,
    Stack,
    TextInput,
    Button,
    Group,
    Title,
    Select,
    Table,
    Text,
    Checkbox,
    ActionIcon,
    rem,
    ScrollArea,
    Pagination
} from "@mantine/core";
import { IconPlus, IconTrash, IconEdit, IconSearch } from "@tabler/icons-react";
import GLoader from '../GLoader';
import { showAlert, showConfirmAlert } from '../Alert';
import apiService from "@/app/http/ApiService";

export default function UniversityForm() {
    const [university, setUniversity] = useState({ name: '', addressLine1: '', addressLine2: '', countryId: '', webSite: '' });
    const [universities, setUniversities] = useState([]);
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [activePage, setPage] = useState(1);
    const [editId, setEditId] = useState(null);
    const nameRef = useRef(null);

    const pageSize = 5;

    const getCountries = () => {
        apiService.commonGetAllCountriesList().then(response => {
            setCountries(response?.data?.data?.map(c => ({ value: c.id.toString(), label: c.name })) || [])
        })
    }
    const getUniversities = () => {
        apiService.universityGetAllList().then(response => {
            setUniversities(response?.data?.data || [])
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await Promise.all([getCountries(), getUniversities()]);
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleSave = () => {
        if (!university.name || !university.addressLine1 || !university.countryId) {
            showAlert("Enter all the required fields!!", 'info');
            return;
        }
        setLoading(true);
        if (editId) {
            apiService.universityUpdate({
                name: university.name,
                countryId: university.countryId,
                addressLine1: university.addressLine1,
                addressLine2: university.addressLine2,
                webSite: university.webSite,
            }, { id: editId }).then(response => {
                showAlert("University Updated successfully!", 'success');
                handleReset();
                getUniversities();
            }).finally(() => {
                setLoading(false);
            })
        }
        else {
            apiService.universityCreate({
                "name": university.name,
                "countryId": Number(university.countryId),
                "addressLine1": university.addressLine1,
                "addressLine2": university.addressLine2,
                "webSite": university.webSite
            }).then(response => {
                showAlert("University added successfully!", 'success');
                handleReset();
                getUniversities();
            }).finally(() => {
                setLoading(false);
            })
        }

    }

    const handleReset = () => {
        setUniversity({ name: '', addressLine1: '', addressLine2: '', countryId: '', webSite: '' })
        setEditId(null);
    }

    const filtered = universities.filter(
        (a) =>
            a.name.toLowerCase().includes(search.toLowerCase()) ||
            a.addressLine1.toLowerCase().includes(search.toLowerCase()) ||
            a.addressLine2.toLowerCase().includes(search.toLowerCase()) ||
            a.webSite.toLowerCase().includes(search.toLowerCase())
    );

    const paginated = filtered.slice(
        (activePage - 1) * pageSize,
        activePage * pageSize
    );

    const handleUpdate = (u) => {
        setEditId(u.id);
        setUniversity({ name: u.name, addressLine1: u.addressLine1, addressLine2: u.addressLine2, countryId: u.country?.toString(), webSite: u.webSite })
        setTimeout(() => {
            nameRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
            nameRef.current?.focus();
        }, 200);
    }

    const handleDelete = (id)=>{
        showConfirmAlert(
              "Are you sure to delete?",
              () => {
                setLoading(true);
                apiService.universityDelete({ id }).then((response) => {
                  showAlert("Deleted successfully", "success");
                  getUniversities();
                }).finally(() => {
                  setLoading(false);
                })
              },
              () => {
                console.log("Delete cancelled");
              }
            );
    }

    return (
        <Stack spacing="xl">
            <Paper shadow="md" p="lg" radius="md" withBorder>
                <Title order={5} mb="md" c="#1971c2">
                    Add University
                </Title>
                <Stack>
                    <TextInput label="Name" value={university.name} onChange={(e) => setUniversity({ ...university, name: e.target.value })} ref={nameRef} required />
                    <Select
                        label="Country"
                        data={countries}
                        value={university.countryId}
                        onChange={(value) => setUniversity({ ...university, countryId: value || "" })}
                        required
                        searchable
                        placeholder="Select Country"
                    />
                    <TextInput label="Address" value={university.addressLine1} onChange={(e) => setUniversity({ ...university, addressLine1: e.target.value })} required />
                    <TextInput label="Address 2" value={university.addressLine2} onChange={(e) => setUniversity({ ...university, addressLine2: e.target.value })} />
                    <TextInput label="Website" value={university.webSite} onChange={(e) => setUniversity({ ...university, webSite: e.target.value })} />
                </Stack>
                <Group justify="flex-end" mt="lg">
                    <Button variant="filled" color="blue" onClick={handleSave}>
                        {editId ? "Update" : "Save"}
                    </Button>
                    <Button color="red" onClick={handleReset}>
                        Reset
                    </Button>
                </Group>
            </Paper>

            <Paper shadow="sm" p="lg" radius="md" withBorder>
                <Group justify="space-between" mb="md" wrap="wrap">
                    <Title order={5} c="#1971c2">
                        University List
                    </Title>
                    <TextInput
                        placeholder="Search universities..."
                        leftSection={<IconSearch size={16} />}
                        value={search}
                        onChange={(e) => setSearch(e.currentTarget.value)}
                    />
                </Group>

                <ScrollArea>
                    <Table striped highlightOnHover withTableBorder verticalSpacing="sm">
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Name</Table.Th>
                                <Table.Th>Country</Table.Th>
                                <Table.Th>Address</Table.Th>
                                <Table.Th>website</Table.Th>
                                <Table.Th style={{ textAlign: 'right' }}>Actions</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {paginated.length > 0 ? (
                                paginated.map((a) => (
                                    <Table.Tr key={a.id}>
                                        <Table.Td>{a.name}</Table.Td>
                                        <Table.Td>
                                            {countries.find((c) => c.value === a.country?.toString())?.label || "-"}
                                        </Table.Td>
                                        <Table.Td>{a.addressLine1}</Table.Td>
                                        <Table.Td>{a.webSite}</Table.Td>
                                        <Table.Td style={{ textAlign: 'right' }}>
                                            <Group gap="xs" justify="flex-end">
                                                <ActionIcon
                                                    variant="light"
                                                    color="blue"
                                                    onClick={() => handleUpdate(a)}
                                                >
                                                    <IconEdit size={18} />
                                                </ActionIcon>
                                                <ActionIcon
                                                    variant="light"
                                                    color="red"
                                                    onClick={() => handleDelete(a.id)}
                                                >
                                                    <IconTrash size={18} />
                                                </ActionIcon>
                                            </Group>
                                        </Table.Td>
                                    </Table.Tr>
                                ))
                            ) : (
                                <Table.Tr>
                                    <Table.Td colSpan={5} style={{ textAlign: 'center' }}>
                                        No universities found.
                                    </Table.Td>
                                </Table.Tr>
                            )}
                        </Table.Tbody>
                    </Table>
                </ScrollArea>

                {filtered.length > pageSize && (
                    <Group justify="center" mt="md">
                        <Pagination
                            total={Math.ceil(filtered.length / pageSize)}
                            value={activePage}
                            onChange={setPage}
                        />
                    </Group>
                )}
            </Paper>


            <GLoader opened={loading} />

            {/* <Paper shadow="md" p="lg" radius="md" withBorder>
                <Title order={5} mb="md" c="#1971c2">
                    Add Programs
                </Title>
                <Stack>
                    <TextInput label="Program Name" value={newProgram.name} onChange={(e) => setNewProgram({ ...newProgram, name: e.target.value })} />
                    <TextInput label="Level" value={newProgram.level} onChange={(e) => setNewProgram({ ...newProgram, level: e.target.value })} />
                    <TextInput label="Fee" value={newProgram.fee} onChange={(e) => setNewProgram({ ...newProgram, fee: e.target.value })} />
                    <TextInput label="Currency" value={newProgram.currency} onChange={(e) => setNewProgram({ ...newProgram, currency: e.target.value })} />
                    <TextInput label="Language" value={newProgram.language} onChange={(e) => setNewProgram({ ...newProgram, language: e.target.value })} />

                    <Group align="end" grow>
                        <TextInput label="Requirement" value={newRequirement.name} onChange={(e) => setNewRequirement({ ...newRequirement, name: e.target.value })} />
                        <Checkbox label="Mandatory" checked={newRequirement.isMandatory} onChange={(e) => setNewRequirement({ ...newRequirement, isMandatory: e.currentTarget.checked })} />
                        <Button color="blue" leftSection={<IconPlus size={16} />} onClick={handleAddRequirement}>
                            Add Requirements
                        </Button>
                    </Group>

                    {newProgram.requirements.length > 0 && (
                        <Table striped withTableBorder highlightOnHover mt="md">
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Name</Table.Th>
                                    <Table.Th>Mandatory</Table.Th>
                                    <Table.Th>Actions</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {newProgram.requirements.map((req, idx) => (
                                    <Table.Tr key={idx}>
                                        <Table.Td>{req.name}</Table.Td>
                                        <Table.Td>{req.isMandatory ? 'Yes' : 'No'}</Table.Td>
                                        <Table.Td>
                                            <ActionIcon color="red" variant="subtle" onClick={() => {
                                                setNewProgram(prev => ({
                                                    ...prev,
                                                    requirements: prev.requirements.filter((_, i) => i !== idx)
                                                }));
                                            }}>
                                                <IconTrash size={16} />
                                            </ActionIcon>
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    )}

                    <Group justify="flex-end">
                        <Button color="blue" onClick={handleAddProgram} leftSection={<IconPlus size={16} />}>
                            Add Program
                        </Button>
                    </Group>
                </Stack>
            </Paper> */}

            {/* {programs.length > 0 && (
                <Paper shadow="sm" p="lg" radius="md" withBorder>
                    <Title order={5} mb="md" c="#1971c2">
                        Program List
                    </Title>
                    <Table striped withTableBorder highlightOnHover>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Name</Table.Th>
                                <Table.Th>Level</Table.Th>
                                <Table.Th>Fee</Table.Th>
                                <Table.Th>Language</Table.Th>
                                <Table.Th>Requirements</Table.Th>
                                <Table.Th>Actions</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {programs.map((program, i) => (
                                <Table.Tr key={i}>
                                    <Table.Td>{program.name}</Table.Td>
                                    <Table.Td>{program.level}</Table.Td>
                                    <Table.Td>{program.fee} {program.currency}</Table.Td>
                                    <Table.Td>{program.language}</Table.Td>
                                    <Table.Td>
                                        <ul style={{ margin: 0, paddingLeft: rem(16) }}>
                                            {program.requirements.map((r, idx) => (
                                                <li key={idx}>{r.name} {r.isMandatory ? '(M)' : ''}</li>
                                            ))}
                                        </ul>
                                    </Table.Td>
                                    <Table.Td>
                                        <ActionIcon variant="subtle" color="blue"><IconEdit size={16} /></ActionIcon>
                                        <ActionIcon variant="subtle" color="red" onClick={() => setPrograms(p => p.filter((_, idx) => idx !== i))}><IconTrash size={16} /></ActionIcon>
                                    </Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Paper>
            )} */}

            {/* <Group justify="flex-end" mt="lg">
                <Button variant="filled" color="blue">Submit</Button>
            </Group> */}
        </Stack>
    );
}
