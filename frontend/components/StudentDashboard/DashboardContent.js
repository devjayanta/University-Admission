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
} from "@mantine/core";
import apiService from "@/app/http/ApiService";

export default function ApplicationTracker() {
    const [application, setApplication] = useState(null);
    const [active, setActive] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // setLoading(true);
        // apiService.getApplicationStatusByUser().then((response) => {
        const app = { status: 'under_review' };
        setApplication(app);

        switch (app?.status) {
            case "submitted":
                setActive(1);
                break;
            case "under_review":
                setActive(2);
                break;
            case "approved":
                setActive(3);
                break;
            default:
                setActive(0);
        }
        // }).finally(() => setLoading(false));
    }, []);

    return (
        <Paper shadow="md" p="lg" radius="md" withBorder>
            <Title order={4} mb="md" c="blue.9">Application Tracking</Title>
            {
                application ? (
                    <Box maw={600} mx="auto">
                        <Stepper active={active} breakpoint="sm" orientation="horizontal" color="blue">
                            <Stepper.Step label="Submitted" description="Application submitted" />
                            <Stepper.Step label="Under Review" description="In review process" />
                            <Stepper.Step label="Approved" description="Final decision made" />
                            <Stepper.Completed>
                                <Text fw={500} c="green">Your application has been approved and completed.</Text>
                            </Stepper.Completed>
                        </Stepper>
                    </Box>
                ) : (
                    <Text c="red">No application found.</Text>
                )}
        </Paper>
    );
}
