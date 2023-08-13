export default function ArtsFind() {
  return (
    <form method="post">
      <div>
        <label>
          Prompt: <input type="text" name="prompt" id="prompt" />
        </label>
      </div>
      <div>
        <button type="submit" className="button">
          Find
        </button>
      </div>
    </form>
  );
}
