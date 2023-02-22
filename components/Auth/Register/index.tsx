import {
    Button,
    Checkbox,
    Paper,
    PasswordInput,
    TextInput,
    Text,
    Box,
    Progress,
    Popover,
    Space,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import {
    MdCheck,
    MdClose,
    MdAlternateEmail,
    MdLockOutline,
} from "react-icons/md";
import { RegisterComponentProps, RegisterFormValues } from "../../../types";

function PasswordRequirement({
    meets,
    label,
}: {
    meets: boolean;
    label: string;
}) {
    return (
        <Text
            color={meets ? "teal" : "red"}
            sx={{ display: "flex", alignItems: "center" }}
            mt={7}
            size="sm"
        >
            {meets ? <MdCheck /> : <MdClose />} <Box ml={10}>{label}</Box>
        </Text>
    );
}

const requirements = [
    { re: /[0-9]/, label: "Includes number" },
    { re: /[a-z]/, label: "Includes lowercase letter" },
    { re: /[A-Z]/, label: "Includes uppercase letter" },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

function getStrength(password: string) {
    let multiplier = password.length > 5 ? 0 : 1;

    requirements.forEach((requirement) => {
        if (!requirement.re.test(password)) {
            multiplier += 1;
        }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

function getPasswordValidation(password: string) {
    let ret = false;
    requirements.forEach((requirement) => {
        ret = requirement.re.test(password);
    });
    return ret;
}

export function RegisterComponent({ registerHandler }: RegisterComponentProps) {
    const form = useForm<RegisterFormValues>({
        initialValues: {
            name: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            accept: false,
        },
        validate: (values: RegisterFormValues) => ({
            name: values.name.length > 0 ? null : "Name is required",
            email: /^\S+@\S+$/.test(values.email) ? null : "Invalid email",
            password: getPasswordValidation(values.password)
                ? null
                : "Password must be at least 6 characters",
            passwordConfirmation:
                values.passwordConfirmation === values.password
                    ? null
                    : "Password confirmation does not match",
            accept: values.accept
                ? null
                : "You must accept the terms and conditions",
        }),
    });

    let pwValues = Object.values({
        ...form.getInputProps("password").value,
    }).join("");

    const [popoverOpened, setPopoverOpened] = useState(false);
    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement
            key={index}
            label={requirement.label}
            meets={requirement.re.test(pwValues)}
        />
    ));

    const strength = getStrength(pwValues);
    const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

    return (
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <form onSubmit={form.onSubmit((values) => registerHandler(values))}>
                <TextInput
                    id="mantine-2wgfg6a6v"
                    label="Name"
                    placeholder="Your name"
                    required
                    {...form.getInputProps("name")}
                />
                <Space h="xl" />
                <TextInput
                    id="mantine-38qkp3wbl"
                    label="Email"
                    placeholder="you@mantine.dev"
                    required
                    icon={<MdAlternateEmail />}
                    {...form.getInputProps("email")}
                />
                <Space h="xl" />
                <Popover
                    opened={popoverOpened}
                    position="bottom"
                    width="target"
                    transition="pop"
                >
                    <Popover.Target>
                        <div
                            onFocusCapture={() => setPopoverOpened(true)}
                            onBlurCapture={() => setPopoverOpened(false)}
                        >
                            <PasswordInput
                                id="mantine-vkphjadj1"
                                label="Your password"
                                placeholder="Your password"
                                description="Strong password should include letters in lower and uppercase, at least 1 number, at least 1 special symbol"
                                {...form.getInputProps("password")}
                                icon={<MdLockOutline />}
                                required
                            />
                        </div>
                    </Popover.Target>
                    <Popover.Dropdown>
                        <Progress
                            color={color}
                            value={strength}
                            size={5}
                            style={{ marginBottom: 10 }}
                        />
                        <PasswordRequirement
                            label="Includes at least 12 characters"
                            meets={pwValues.length > 6}
                        />
                        {checks}
                    </Popover.Dropdown>
                </Popover>
                <Space h="xs" />
                <PasswordInput
                    id="mantine-b9nkkwv5u"
                    label="Confirm password"
                    placeholder="Your password"
                    icon={<MdLockOutline />}
                    {...form.getInputProps("passwordConfirmation")}
                    required
                />
                <Space h="xl" />
                <Space h="xl" />
                <Checkbox
                    id="mantine-y200hmiyi"
                    label="I accept the terms and conditions"
                    {...form.getInputProps("accept")}
                    required
                />
                <Button type="submit" fullWidth mt="xl">
                    Register
                </Button>
            </form>
        </Paper>
    );
}
