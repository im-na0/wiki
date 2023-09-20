import React from "react";
import "../styles/Project.css";
import ProjectSider from "../components/project/ProjectSider";
import { Layout } from "antd";
import ProjectListSider from "../components/project/ProjectListSider";
import ProjectDetailDefault from "../components/project/ProjectDetailDefault";

const { Content, Sider } = Layout;

const ProjectList = () => {
  return (
    <Layout>
      <ProjectSider />
      <Layout>
        <Sider theme="light" width={260}>
          <ProjectListSider />
        </Sider>
        <Content
          className="project__content-area"
          style={{
            minHeight: "calc(100vh - 64px)",
            backgroundColor: "#f5f5f5",
            padding: "10px",
          }}
        >
          <ProjectDetailDefault />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProjectList;
