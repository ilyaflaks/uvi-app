function App() {
  const { useState, useEffect } = React;
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [isError, setIsError] = useState(false);
  const [url, setUrl] = useState(
    "https://data.epa.gov/efservice/getEnvirofactsUVHOURLY/ZIP/56711/json"
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [display, setDisplay] = React.useState(false);

  let uvIndex;
  const timeEvent = new Date();
  let timeStr = timeEvent.toLocaleTimeString("en-US");
  let shortTime = timeStr.replace(" ", ":").split(":");
  let hour = shortTime[0];
  let ampm = shortTime[3];

  if (hour.length === 1) {
    hour = "0" + hour;
  }
  let epaTime = hour + " " + ampm;

  if (data.length > 0) {
    data.forEach((element) => {
      let end = element.DATE_TIME.substring(12);
      if (end === epaTime) {
        console.log(element.UV_VALUE);
        uvIndex = element.UV_VALUE;
      }
    });
  }

  let warning = "";

  if (uvIndex > 5) {
    warning =
      "You should be wearing sunscreen if you are planning on going outside for more than 5 minutes";
  } else {
    warning = "You are clear to go outside without sunscreen";
  }

  useEffect(() => {
    console.log("Fetching data...");
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await axios(url);
        setData(result.data);
      } catch (error) {
        setIsError(true);
        setDisplay(false);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return (
    <div className="uv-app">
      <h1 className="header">UV App</h1>
      <h3 className="instructions">Enter your Zip Code below:</h3>
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          if (query.length != 5 && typeof query != "number") {
            alert(
              "ZIP Code should be 5 digits. The app accepts US ZIP codes only"
            );
          } else {
            setUrl(
              `https://data.epa.gov/efservice/getEnvirofactsUVHOURLY/ZIP/${query}/json`
            );
          }
          if (!isError) {
            setDisplay(true);
          }
        }}
      >
        <input
          className="input"
          type="text"
          placeholder="11111"
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        ></input>
        <button className="button" type="submit">
          Search
        </button>
      </form>
      {display && (
        <div>
          <h1 className="outcome">
            The UV Index in your ZIP Code is: {uvIndex}
          </h1>
          <h4 id="warning">{warning}</h4>
        </div>
      )}
      {isError && <h4 id="warning">There was a problem</h4>}
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
