import type { UserType } from '@/types/type'
import { FC, useRef, useState } from 'react'
import { Spin, Table } from 'antd/'
import { ColumnsType } from 'antd/es/table'

type Props = {
  columnName: ColumnsType<Record<string, any>>
  users: UserType[]
}

export const UserList: FC<Props> = ({ columnName, users: defaultUsers }) => {
  const [users, setUsers] = useState(defaultUsers)
  const inputRef = useRef<HTMLInputElement>(null)
  return !users ? (
    <Spin size="large" className="flex justify-center my-[10rem]" />
  ) : (
    <div className="max-w-[53rem] mx-auto my-[3rem] px-[1rem]">
      <form
        className="text-right"
        onSubmit={(e) => {
          e.preventDefault()
          if (users.length !== defaultUsers.length) {
            setUsers(defaultUsers)
            return
          }
          setUsers(
            defaultUsers.filter(
              (data) =>
                data.email?.includes(inputRef?.current?.value ?? '') ||
                (data as any).user_name?.includes(
                  inputRef?.current?.value ?? '',
                ),
            ),
          )
        }}
      >
        <input
          ref={inputRef}
          type="text"
          className="mb-3 w-[16rem] py-1 px-1"
          placeholder={'名前もしくはメールアドレスの一部を入力'}
        ></input>
        <button type="submit" className="underline text-main px-2 py-1">
          {users.length !== defaultUsers.length
            ? '元に戻す'
            : 'データを絞り込む'}
        </button>
      </form>
      <Table
        columns={columnName}
        dataSource={users}
        rowKey={'id'}
        size="small"
      />
    </div>
  )
}
