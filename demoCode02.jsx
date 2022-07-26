const ATMDeposit = ({ onChange, isDeposit }) => {
  const choice = ["Deposit", "Cash Back"];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input type="number" width="200" onChange={onChange}></input>
      <input type="submit" width="200" value="Submit"></input>
      git remote add origin git@github.com:ilyaflaks/delete-me.git
    </label>
  );
};

let deposit = 0;

const Account = () => {
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);

  let status = `Account Balance $ ${totalState}`;
  let alert = "";
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);

  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    deposit = Number(event.target.value);
  };

  const handleSubmit = () => {
    let newTotal = function () {
      if (isDeposit && deposit > 0) {
        document.getElementById("alert-space").innerHTML = "";
        return totalState + deposit;
      } else if (isDeposit && deposit < 0) {
        document.getElementById("alert-space").innerHTML =
          "Invalid Transaction";
        return totalState;
      } else if (!isDeposit && deposit > 0 && totalState - deposit >= 0) {
        document.getElementById("alert-space").innerHTML = "";
        return totalState - deposit;
      } else if (!isDeposit && deposit < 0) {
        document.getElementById("alert-space").innerHTML =
          "Invalid Transaction";
        return totalState;
      } else if (!isDeposit && totalState - deposit < 0) {
        document.getElementById("alert-space").innerHTML = "Insufficient Funds";
        return totalState;
      } else if (
        (!isDeposit && deposit === 0) ||
        (isDeposit && deposit === 0)
      ) {
        return totalState;
      }
    };

    setTotalState(newTotal);
    event.preventDefault();
  };

  return (
    <div className="main-app">
      <h1 className="header">ATM Machine</h1>
      <div className="screen">
        <form onSubmit={handleSubmit}>
          <h2 id="total">{status}</h2>
          <p id="alert-space"></p>
          <button
            onClick={() => {
              setIsDeposit(true);
              document.getElementById("deposit-btn").style.background =
                "#0ff166";
              document.getElementById("cashback-btn").style.background =
                "#0c80f3";
            }}
            type="button"
            id="deposit-btn"
          >
            Deposit
          </button>
          <button
            onClick={() => {
              setIsDeposit(false);
              document.getElementById("deposit-btn").style.background =
                "#0c80f3";
              document.getElementById("cashback-btn").style.background =
                "#0ff166";
            }}
            type="button"
            id="cashback-btn"
          >
            Cash Back
          </button>
          <ATMDeposit
            onChange={handleChange}
            isDeposit={isDeposit}
          ></ATMDeposit>
        </form>
      </div>
      <div className="hardware">
        <div className="card-slot">
          <div className="slit"></div>
        </div>
        <div className="pad">
          <p className="square">.</p>
          <p className="square">.</p>
          <p className="square">.</p>
          <p className="square">.</p>
          <p className="square">.</p>
          <p className="square">.</p>
          <p className="square">.</p>
          <p className="square">.</p>
          <p className="square">.</p>
          <p className="square">.</p>
          <p className="square">.</p>
          <p className="square">.</p>
        </div>
        <div className="cash-slot"></div>
      </div>
    </div>
  );
};

ReactDOM.render(<Account />, document.getElementById("root"));
