import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";



const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: false,
  listType: "picture",
  accept: ".png,.jpeg,.jpg",
  action: "https://localhost:5173/",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};


const ProductCustUpload = () => (
  <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading
      company data or other band files
    </p>
  </Dragger>
);
export default ProductCustUpload;
