import type { UserType } from "@/types/type";
import { FC } from "react";
import { Spin, Table } from "antd/";
import { ColumnsType } from "antd/es/table";

type Props = {
  columnName: ColumnsType<Record<string, any>>;
  users: UserType[];
};

export const UserList: FC<Props> = ({ columnName, users }) => {
  return !users ? (
    <Spin size="large" className="flex justify-center my-[10rem]" />
  ) : (
    <div className="max-w-[53rem] mx-auto my-[4.5rem] px-[1rem]">
      <Table columns={columnName} dataSource={users} rowKey={"id"} />
    </div>
  );
};
