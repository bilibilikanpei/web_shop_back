import React, { Component } from 'react';
import {
    Button, Modal, Form, Input, Radio,
} from 'antd';

const FormItem = Form.Item;

const CollectionCreateForm = Form.create({
    mapPropsToFields: (props) => {
        return {
            name: Form.createFormField(
                {
                    a: 'a',
                    b: 'b'
                }
            )
        }
    },
    validateMessages: { required: '%s 是必须的' },
    onFieldsChange(props, changedFields) {
        // console.log(props, changedFields);
    },
    onValuesChange(props, changedValues, allValues) {
        // console.log(props, changedValues, allValues)
    }
})(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const {
                visible, onCancel, onCreate, form, onTest, wrappedInputRef
            } = this.props;
            const { getFieldDecorator } = form;//这个form参数是包装后的 很特别的对象
            return (
                <Modal
                    visible={visible}
                    title="添加一件商品"
                    okText="添加"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <GoodPic wrappedInputRef={wrappedInputRef} />
                        <FormItem label="名称:" colon={false}>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '清输入商品名称' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="价格">
                            {getFieldDecorator('price', {
                                rules: [{ required: true, message: '清输入商品价格' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem>
                            <input type="text" />
                        </FormItem>
                        <Button type="primary" onClick={onTest}>test</Button>
                    </Form>
                </Modal>
            );
        }
    }
);

class CollectionsPage extends React.Component {
    state = {
        visible: false,
    };

    showModal = () => {
        this.setState({ visible: true });
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            //图片没有做验证
            if (err) {
                console.log(err);
                console.log(form.getFieldError('price'));
                return;
            }

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
            //在这里进行数据提交

            var xmlhttp,
                formData = new FormData();
            formData.append('name', values.name);
            formData.append('price', values.price);
            formData.append('picture', this.inputRef.files[0]);
            if (window.XMLHttpRequest) {
                //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
                xmlhttp = new XMLHttpRequest();
            }
            else {
                // IE6, IE5 浏览器执行代码
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    //这里回调
                    console.log(xmlhttp.responseText);
                }
            }
            xmlhttp.open("POST", "http://localhost:3000/upLoad", true);
            xmlhttp.send(formData);
        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    saveInputRef = (inputRef) => {
        this.inputRef = inputRef;
    }

    handleTest = () => {
        const form = this.formRef.props.form;
        form.setFieldsValue({ name: 'hello' })
        console.log(this.inputRef);
    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>添加商品</Button>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    wrappedInputRef={this.saveInputRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    onTest={this.handleTest}
                />
            </div>
        );
    }
}

class GoodPic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            hasImg: false
        }
    }
    setImg = () => {
        let reader = new FileReader();
        reader.addEventListener('load', () => {
            this.setState({
                url: reader.result,
                hasImg: true
            });
        });
        reader.readAsDataURL(this.inputRef.files[0]);
    }
    render() {
        const style = {
            opacity: this.state.hasImg ? 1 : 0
        };
        return (
            <div className='imgContainer'>
                <input type='file'
                    className='imgInput'
                    name='picture'
                    ref={(ref) => {
                        this.inputRef = ref;
                        this.props.wrappedInputRef(ref);
                    }}
                    onChange={this.setImg}
                ></input>
                {this.state.url ? <img className='imgGood' style={style} src={this.state.url} alt='图片加载失败' /> : null}
            </div>
        )
    }
}

export default CollectionsPage;