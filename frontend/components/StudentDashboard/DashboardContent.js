import { useEffect, useState } from "react";
import {
    Paper,
    Title,
    Text,
    Stepper,
    Group,
    Loader,
    Center,
    Box,
    ScrollArea,
    Table
} from "@mantine/core";
import apiService from "@/app/http/ApiService";
import GLoader from "../GLoader";

export default function ApplicationTracker() {
    const [applications, setApplications] = useState(null);
    const [active, setActive] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        apiService.userProcessGetByUserIdList().then(response => {
            console.log("applications", response?.data?.data)
            setApplications(response?.data?.data)
        }).finally(() => {
            setLoading(false);
        })
    }, []);

    return (
        <>
            <Paper shadow="md" p="lg" radius="md" withBorder>
                <Title order={4} mb="md" c="blue.9">Application Tracking</Title>
                {
                    applications?.length > 0 ? (
                        <ScrollArea>
                            <Table striped highlightOnHover withTableBorder verticalSpacing="sm">
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>Applied University</Table.Th>
                                        <Table.Th>Applied Program</Table.Th>
                                        <Table.Th>status</Table.Th>
                                        <Table.Th>Remarks</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {
                                        applications?.map((a, id) => (
                                            <Table.Tr key={id}>
                                                <Table.Td>{a.universityName}</Table.Td>
                                                <Table.Td>{a.universityProgramName}</Table.Td>
                                                <Table.Td>{a.status}</Table.Td>
                                                <Table.Td>{a.remarks}</Table.Td>
                                            </Table.Tr>
                                        ))
                                    }

                                </Table.Tbody>
                            </Table>
                        </ScrollArea>
                    ) : (
                        <Text c="red">No application found.</Text>
                    )}
            </Paper>

            <GLoader opened={loading} />
        </>
    );
}
