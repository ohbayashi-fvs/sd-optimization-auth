import type { UserType } from "@/types/type";
import { FC } from "react";
import { Table } from "antd/";
import { ColumnsType } from "antd/es/table";

type Props = {
  columnName: ColumnsType<Record<string, any>>;
  users: UserType[];
};

export const UserList: FC<Props> = ({ columnName, users }) => {
  if (!users) {
    return <>Loading...</>;
  }

  return (
    <>
      <div className="max-w-[53rem] mx-auto my-[4.5rem]">
        <Table columns={columnName} dataSource={users} rowKey={"id"} />
      </div>
    </>
  );
};
