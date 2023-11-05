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
    Input,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useState } from "react";
import { MdCheck, MdClose, MdAlternateEmail } from "react-icons/md";
import { RegisterComponentProps, RegisterFormValues } from "../../../types";
import { z } from "zod";

function PasswordRequirement({
    meets,
    label,
}: {
    meets: boolean;
    label: string;
}) {
    return (
        <Text
            c={meets ? "teal" : "red"}
            style={{ display: "flex", alignItems: "center" }}
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

const schema = z
    .object({
        name: z
            .string()
            .min(2, { message: "Name should have at least 2 letters" }),
        email: z.string().email({ message: "Invalid email" }),
        password: z
            .string()
            .regex(new RegExp(/[0-9]/), "Includes at least one number")
            .regex(
                new RegExp(/[a-z]/),
                "Includes at least one lowercase letter"
            )
            .regex(
                new RegExp(/[A-Z]/),
                "Includes at least one uppercase letter"
            )
            .regex(
                new RegExp(/[$&+,:;=?@#|'<>.^*()%!-]/),
                "Includes at least one special symbol"
            )
            .min(6, "Password must be at least 6 characters"),
        passwordConfirmation: z
            .string()
            .min(6, "Password must be at least 6 characters"),
        accept: z.literal<boolean>(true, {
            errorMap: () => ({
                message: "You must accept terms and conditions",
            }),
        }),
    })
    .superRefine(({ password, passwordConfirmation }, ctx) => {
        if (password !== passwordConfirmation) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Passwords must match",
                path: ["passwordConfirmation"],
            });
        }
        return ctx;
    });

export function RegisterComponent({ registerHandler }: RegisterComponentProps) {
    const form = useForm<RegisterFormValues>({
        initialValues: {
            name: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            accept: false,
        },
        validate: zodResolver(schema),
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
                    label="Name"
                    placeholder="Your name"
                    withAsterisk
                    {...form.getInputProps("name")}
                />
                <Space h="xl" />
                <TextInput
                    label="Email"
                    placeholder="you@mantine.dev"
                    withAsterisk
                    rightSection={<MdAlternateEmail />}
                    {...form.getInputProps("email")}
                />
                <Space h="xl" />
                <Popover
                    opened={popoverOpened}
                    position="bottom"
                    width="target"
                    transitionProps={{ transition: "pop" }}
                >
                    <Popover.Target>
                        <div
                            onFocusCapture={() => setPopoverOpened(true)}
                            onBlurCapture={() => setPopoverOpened(false)}
                        >
                            <PasswordInput
                                label="Your password"
                                placeholder="Your password"
                                description="Strong password should include letters in lower and uppercase, at least 1 number, at least 1 special symbol"
                                {...form.getInputProps("password")}
                                withAsterisk
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
                            label="Includes at least 6 characters"
                            meets={pwValues.length >= 6}
                        />
                        {checks}
                    </Popover.Dropdown>
                </Popover>
                <Space h="xs" />
                <PasswordInput
                    label="Confirm password"
                    placeholder="Your password"
                    {...form.getInputProps("passwordConfirmation")}
                    withAsterisk
                />
                <Space h="xl" />
                <Space h="xl" />
                <Input.Wrapper label="Terms and conditions" withAsterisk>
                    <Checkbox
                        label="I accept the terms and conditions"
                        {...form.getInputProps("accept")}
                    />
                </Input.Wrapper>
                <Button type="submit" fullWidth mt="xl">
                    Register
                </Button>
            </form>
        </Paper>
    );
}
