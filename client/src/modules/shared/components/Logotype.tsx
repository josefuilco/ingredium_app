interface LogotypeProps {
  readonly className?: string;
}

function Logotype({ className }: LogotypeProps) {
  return (
    <section>
      <img className={className ?? "rounded-xl h-[70px]"} src='/images/logo.png' alt='Ingredium Logo' />
    </section>
  );
}

export default Logotype;