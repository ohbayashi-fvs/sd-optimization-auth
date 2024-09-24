import type { UserType } from '@/types/type'
import { FC, FormEvent, RefObject, useRef, useState } from 'react'
import { Spin, Table } from 'antd/'
import { ColumnsType } from 'antd/es/table'

type Props = {
  columnName: ColumnsType<Record<string, any>>
  users: UserType[]
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  inputRef: RefObject<HTMLInputElement>
  filter: string
}

export const UserList: FC<Props> = ({
  columnName,
  users,
  onSubmit,
  inputRef,
  filter,
}) => {
  return !users ? (
    <Spin size="large" className="flex justify-center my-[10rem]" />
  ) : (
    <div className="max-w-[53rem] mx-auto my-[3rem] px-[1rem]">
      <form className="text-right" onSubmit={onSubmit}>
        <input
          ref={inputRef}
          type="text"
          className="mb-3 w-[16rem] py-1 px-1"
          placeholder={'名前もしくはメールアドレスの一部を入力'}
        ></input>
        <button type="submit" className="underline text-main px-2 py-1">
          {filter.length > 0 ? '元に戻す' : 'データを絞り込む'}
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
