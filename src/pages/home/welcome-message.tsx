interface Props {
  name?: string;
}

export function WelcomeMessage({ name = 'There' }: Props) {
  return (
    <h2 className="mb-4 text-3xl leading-tight text-muted-foreground mt-8">
      Hi {name}, welcome to your little drive. You can create and share notes,
      documents, images and more.
    </h2>
  );
}
