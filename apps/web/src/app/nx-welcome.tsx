export function NxWelcome({ title }: { title: string }) {
  return (
    <div id="welcome">
      <h1>
        <span> Hello there, </span>
        Welcome {title} 👋
      </h1>
    </div>
  );
}

export default NxWelcome;
