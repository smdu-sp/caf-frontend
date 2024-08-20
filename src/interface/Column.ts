import CompleteTableRow from "./CompletTableRow";

export default interface Column {
    header: string;
    accessor: keyof CompleteTableRow;
    type: 'text' | 'number' | 'date';
}