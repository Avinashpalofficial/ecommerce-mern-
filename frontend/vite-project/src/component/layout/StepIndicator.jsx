const StepIndicator = ({ step }) => {
  const steps = ["Request", "Old Email", "New Email"];

  return (
    <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
      {steps.map((s, i) => (
        <div
          key={s}
          style={{
            fontWeight: step === i + 1 ? "bold" : "normal",
            color: step >= i + 1 ? "green" : "gray"
          }}
        >
          {i + 1}. {s}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
