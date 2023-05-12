interface InertiaPageProps<PageProps extends object = unknown>
    extends PageProps {
    [key: string]: unknown;
    auth: {
        user: User;
    };
}

type SharedProps = Record<string, unknown>;
