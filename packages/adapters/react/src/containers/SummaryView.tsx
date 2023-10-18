import { Data, Identity } from "@monotonics/core";

export type SummaryViewProps = {
  data: Data;
};

export const SummaryView = ({ data }: SummaryViewProps): JSX.Element => {
  return (
    <div
      style={{
        padding: "1rem",
        width: "calc(100% - 2rem)",
        maxWidth: 768,
        fontSize: "0.85rem",
      }}
    >
      <div style={{ width: "100%" }}>
        <div
          style={{
            borderBottom: "0.0625rem solid #dee2e6",
            fontWeight: "bold",
          }}
        >
          Basic
        </div>
        <table style={{ width: "100%", fontSize: "0.75rem" }}>
          <tbody>
            <tr>
              <td style={{ width: "50%" }}>Date</td>
              <td style={{ width: "50%" }}>{data.date.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
        <div
          style={{
            borderBottom: "0.0625rem solid #dee2e6",
            fontWeight: "bold",
            paddingTop: "2rem",
          }}
        >
          Params
        </div>
        <table style={{ width: "100%", fontSize: "0.75rem" }}>
          <tbody>
            {Object.keys(data.params).map((key) => (
              <tr key={key}>
                <td style={{ width: "50%" }}>{key}</td>
                <td style={{ width: "50%" }}>{`${data.params[key]}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
