import { useProductsStore } from "@/features/useProductsStore/useProductsStore";
import { Form, Modal, Typography } from "antd";
import {
  type AddMethodType,
  type TagsType,
} from "../../../shared/types/AddProductModal";
import { AddMethod } from "@/shared/ui/AddMethod/AddMethod";
import { UrlInput } from "@/shared/ui/UrlInput/UrlInput";
import { TagGroup } from "@/shared/ui/TagGroup/TagGroup";
import { NotificationCheckbox } from "@/shared/ui/NotificationCheckbox/NotificationCheckbox";
import { PreviewProduct } from "@/shared/ui/PreviewProduct/PreviewProduct";
import { TresholdInput } from "@/shared/ui/TresholdInput/TresholdInput";

interface AddProductModalProps {
  isOpenModal: boolean;
  setIsModalOpen: (isOpenModal: boolean) => void;
}

interface Values {
  addMethod: AddMethodType;
  isNotificationActive: boolean;
  tags?: TagsType[];
  treshold?: number | null;
  url: string;
}

const { Title } = Typography;

export const AddProductModal = ({
  isOpenModal,
  setIsModalOpen,
}: AddProductModalProps) => {
  const [form] = Form.useForm();
  const addMethod = Form.useWatch("addMethod", form);
  const isNotificationActive = Form.useWatch("isNotificationActive", form);

  const preview = useProductsStore((state) => state.preview);
  const addProduct = useProductsStore((state) => state.addProduct);

  const onSubmit = (values: Values) => {
    const { addMethod, url } = values;
    if (addMethod === "article") {
      addProduct(`https://www.wildberries.ru/catalog/${url}/detail.aspx`);
    } else if (addMethod === "link") {
      addProduct(url);
    }

    setIsModalOpen(false);
  };

  return (
    <Modal
      title={
        <Title level={2} style={{ textAlign: "center" }}>
          Форма добавления товара
        </Title>
      }
      centered
      open={isOpenModal}
      okButtonProps={{ autoFocus: true, htmlType: "submit" }}
      destroyOnHidden
      onCancel={() => setIsModalOpen(false)}
      style={{ border: "3px solid #FFD700", borderRadius: 11 }}
      okText="Добавить"
      cancelText="Отменить"
      modalRender={(dom) => (
        <Form
          layout="vertical"
          form={form}
          name="form_in_modal"
          initialValues={{ modifier: "public" }}
          clearOnDestroy
          onFinish={(values) => onSubmit(values)}
        >
          {dom}
        </Form>
      )}
    >
      <AddMethod />

      <UrlInput method={addMethod} />

      <TagGroup />
      <NotificationCheckbox />
      <TresholdInput isNotificationActive={isNotificationActive} />

      <PreviewProduct preview={preview} />
    </Modal>
  );
};
