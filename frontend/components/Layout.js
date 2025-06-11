import { useEffect, useState } from "react";
import { Container, Group, Text, Flex, Divider, Title } from "@mantine/core";
import { IconPhone, IconMail } from '@tabler/icons-react';

function useDateTime() {
    if (typeof window !== 'undefined') {
        const [dateTime, setDateTime] = useState(new Date());
        useEffect(() => {
            const interval = setInterval(() => setDateTime(new Date()), 1000);
            return () => clearInterval(interval);
        }, []);
        return dateTime.toLocaleString();
    }
}

export function Header() {
    const currentDateTime = useDateTime();

    return (
        <header style={{ backgroundColor: "#edf2ff", padding: "1rem 0" }}>
            <Container size="xl">
                <Flex justify="space-between" align="center" direction={{ base: "column", sm: "row" }}>
                    <Group spacing="xl" mb={{ base: "sm", sm: 0 }}>
                        <Group gap={5}>
                            <IconMail stroke={2} size={16} color="red" />
                            <Text size="sm" c="blue.9" fw={600}>
                                info@studyinnepal.com
                            </Text>
                        </Group>
                        <Group gap={5}>
                            <IconPhone stroke={2} size={16} color="red" />
                            <Text size="sm" c="blue.9" fw={600}>
                                +977-9800000000
                            </Text>
                        </Group>
                    </Group>
                    <Text size="sm" c="blue.9">
                        {currentDateTime}
                    </Text>
                </Flex>

                <Divider my="sm" />

                <Flex direction="column" align="center" gap="xs">
                    <Title order={2} c="blue.8" ta="center" fw={700}>
                        Study in Nepal
                    </Title>
                    <Text size="md" c="gray.6" ta="center">
                        We're with you at every step of your journey.
                    </Text>
                </Flex>
            </Container>
        </header>
    );
}

export function Footer() {
    return (
        <footer style={{ backgroundColor: "#edf2ff", padding: "2rem 0", marginTop: "4rem" }}>
            <Container size="xl">
                <Flex direction="column" align="center" gap="sm">
                    <Text size="sm" c="gray.6">
                        Explore opportunities, scholarships, and top programs across Nepalese universities.
                    </Text>
                    <Divider my="md" w="100%" />
                    <Text size="sm" c="gray.6">
                        © 2025 <strong>Study in Nepal Admission System.</strong> Made by <strong>JND Team</strong>.
                    </Text>
                </Flex>
            </Container>
        </footer>
    );
}
