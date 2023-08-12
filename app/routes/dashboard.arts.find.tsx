export default function ArtsFind() {
  return (
    <>
      <h1>Find Arts via OpenAI</h1>
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
    </>
  );
}
