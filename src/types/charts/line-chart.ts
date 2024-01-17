export interface LineChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      fill?: boolean;
      xAxisID?: string; // Optional: To specify the xAxisID
    }[];
  };
}
