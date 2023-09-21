import React, { useState, useEffect } from "react";
import { Table, Skeleton } from "antd";
import { FormDataType } from "../../type/form";
import { columns } from "../../data/tableColumns";
import { useFetchData } from "../../hooks/Employee/useFetchData";
import { useNavigate } from "react-router-dom";

type SelectedRowData = {
  id: string;
  teamId?: string;
};

interface MemberTableProps {
  setSelectedRowKeys: (keys: SelectedRowData[]) => void;
  searchText: string;
  filterValue: string;
  sortValue: string;
}

export default function MemberTable({
  setSelectedRowKeys,
  searchText,
  filterValue,
  sortValue,
}: MemberTableProps) {
  const fetchDataParams = {
    COLLECTION_NAME: "Users",
    ORDER: "name",
  };
  const { data, loading } = useFetchData(fetchDataParams);

  const [filteredData, setFilteredData] = useState<FormDataType[]>(data);

  const navigate = useNavigate();

  useEffect(() => {
    const filteredByAccess = filterValue
      ? data.filter((item: FormDataType) => item.access === filterValue)
      : data;

    const searchedData = filteredByAccess.filter((item: FormDataType) => {
      if (!searchText) return true;
      const nameIncludes = item.name ? item.name.includes(searchText) : false;
      const departmentIncludes = item.department
        ? item.department.includes(searchText)
        : false;
      return nameIncludes || departmentIncludes;
    });

    const sortedDataSource = [...searchedData];
    switch (sortValue) {
      case "sortName":
        sortedDataSource.sort((a, b) =>
          (a.name ?? "").localeCompare(b.name ?? ""),
        );
        break;
      case "sortTeam":
        sortedDataSource.sort((a, b) =>
          (a.team ?? "").localeCompare(b.team ?? ""),
        );
        break;
      default:
        break;
    }

    const dataWithKeys = sortedDataSource.map((item) => ({
      ...item,
      key: item.id,
    }));
    setFilteredData(dataWithKeys);
  }, [data, filterValue, sortValue, searchText]);

  const skeletonData = Array(8)
    .fill({})
    .map((_, index) => ({ key: `skeleton-${index}` }));

  const displayData = loading ? skeletonData : filteredData;

  type RenderArgs = {
    text: string;
    record: FormDataType;
    index: number;
  };
  const skeletonColumns = columns(navigate).map((col) => ({
    ...col,
    render: (text: string, record: FormDataType) => {
      if (loading) return <Skeleton active paragraph={false} />;
      return col.render ? col.render(record) : text;
    },
  }));

  return (
    <>
      <Table
        dataSource={displayData}
        columns={skeletonColumns}
        pagination={{
          defaultPageSize: 8,
          showSizeChanger: true,
        }}
        rowSelection={
          loading
            ? undefined
            : {
                onChange: (
                  selectedKeys: React.Key[],
                  selectedRows: FormDataType[],
                ) => {
                  const selectedIds = selectedRows
                    .filter((row) => row.id)
                    .map((row) => ({
                      id: row.id!,
                      teamId: row.teamId,
                    }));
                  console.log(selectedIds);
                  setSelectedRowKeys(selectedIds);
                },
              }
        }
      />
    </>
  );
}
