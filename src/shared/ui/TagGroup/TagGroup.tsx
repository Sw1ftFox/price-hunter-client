import { TAGS, TagsKind, type TagsType } from "@/shared/types/AddProductModal";
import { Form, Tag } from "antd";
import { useState } from "react";

export const TagGroup = () => {
  const [tags, setTags] = useState<TagsType[]>([]);

  return (
    <Form.Item label="Тэги:" name="tags" style={{ fontWeight: 600 }}>
      <Tag.CheckableTagGroup
        styles={{
          item: {
            border: "1px solid #FFD700",
            borderRadius: 10,
          },
          root: {
            flexWrap: "nowrap",
          },
        }}
        multiple
        options={Object.values(TagsKind).map((tag) => ({
          label: TAGS[tag],
          value: tag,
        }))}
        value={tags}
        onChange={setTags}
      />
    </Form.Item>
  );
};
