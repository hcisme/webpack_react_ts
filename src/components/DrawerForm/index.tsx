import { Drawer, Form, DrawerProps, Button, Space, FormProps, FormInstance } from 'antd';
import { ReactElement, useState, cloneElement, Dispatch } from 'react';

type IDrawerStatus = Dispatch<boolean>;

interface IProps<T> {
  children: ReactElement | ((form: FormInstance) => ReactElement);

  triggerElement: ReactElement;

  drawerProps?: DrawerProps;

  formProps?: FormProps;

  /**
   * 在打开之前做些什么
   */
  onBeforeOpen?: (setOpen: IDrawerStatus) => void;

  /**
   * 在关闭之前做些什么
   */
  onBeforeClose?: (setOpen: IDrawerStatus, form: FormInstance) => void;

  /**
   * 表单提交
   */
  onFinish?: (values: T, setOpen: IDrawerStatus, form: FormInstance) => Promise<boolean>;
}

const Index: <T>(props: IProps<T>) => JSX.Element = (props) => {
  const {
    children,
    triggerElement,
    drawerProps,
    formProps,
    onBeforeOpen,
    onBeforeClose,
    onFinish
  } = props;
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const onClosed = () => {
    if (onBeforeClose) {
      onBeforeClose(setOpen, form);
    } else {
      setOpen(false);
    }
  };

  const onOk = async () => {
    try {
      const values = await form.validateFields();
      setSubmitLoading(true);
      onFinish?.(values, setOpen, form).finally(() => {
        setSubmitLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {cloneElement(triggerElement, {
        onClick: () => {
          if (onBeforeOpen) {
            onBeforeOpen(setOpen);
          } else {
            setOpen(true);
          }
        }
      })}

      <Drawer
        open={open}
        onClose={onClosed}
        destroyOnClose
        footer={
          <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Button
              onClick={() => {
                onClosed();
              }}
            >
              取消
            </Button>
            <Button
              type="primary"
              loading={submitLoading}
              onClick={onOk}
            >
              确定
            </Button>
          </Space>
        }
        {...drawerProps}
      >
        <Form
          form={form}
          scrollToFirstError
          {...formProps}
        >
          {typeof children === 'function' ? children(form) : children}
        </Form>
      </Drawer>
    </>
  );
};

export default Index;
