import { DefaultList, DefaultListParam } from "./DefaultList";
import { DefaultTable, DefaultTableParam } from "./DefaultTable";

export type DefaultDataDisplayParam = DefaultTableParam & DefaultListParam;

export const DefaultDataDisplay = ({
  listItems,
  tableItems,
  handleDelete,
  handleEdit,
  columnNames,
  emptyMessage,
}: DefaultDataDisplayParam) => (
  <>
    {/* "IF MOBILE" */}
    <DefaultList
      emptyMessage={emptyMessage}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      listItems={listItems}
    />
    {/* "IF DESKTOP" */}
    <DefaultTable
      columnNames={columnNames}
      emptyMessage={emptyMessage}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      tableItems={tableItems}
    />
  </>
);
