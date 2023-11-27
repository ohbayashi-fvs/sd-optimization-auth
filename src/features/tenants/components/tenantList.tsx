import type { Tenant } from "@/types/tenant/tenant";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";

type Props = {
  tenants: Tenant[];
};

export const TenantList: FC<Props> = ({ tenants }) => {
  const route = useRouter();

  const onClickEditButton = async (id: string) => {
    route.push(`/tenants/edit/${id}`);
  };

  return (
    <>
      {tenants ? (
        <table className="mx-auto my-[100px] px-[10px] border-collapse">
          <thead className="bg-[#FAFAFA]">
            <tr className="border-gray-100 border-t-0 border-x-0 border-solid">
              <th className="min-w-[15rem] h-[55px] pl-[1rem] text-start text-[14px] font-medium border-gray-100 border-y-0 border-l-0 border-solid">
                テナント名
              </th>
              <th className="min-w-[5rem] h-[55px] pl-[16px] text-start text-[14px] font-medium">
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant: Tenant) => (
              <tr
                key={tenant.id}
                className="border-gray-100 border-t-0 border-x-0 border-solid h-[55px]"
              >
                <td className="pl-[16px]">{tenant.tenant_name}</td>
                <td className="pl-[16px] pt-[16px]">
                  <button
                    type="button"
                    onClick={async () => {
                      await onClickEditButton(tenant.id);
                    }}
                    className="flex items-center justify-center mb-[0.75rem]"
                  >
                    <Image
                      src={"/images/edit_icon@2x.png"}
                      width={27}
                      height={27}
                      alt="編集アイコン"
                    ></Image>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot></tfoot>
        </table>
      ) : (
        <></>
      )}
    </>
  );
};
