import React from 'react'
import Image from 'next/image'
import addPhoto from '../util/image/addPhoto.png'
import { Button, Input, Card, Form, Row, Col } from 'antd'
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import Theme from '../styles/Theme.module.css'
import ImageUploading from 'react-images-uploading';
import { sendData } from '../pages/api/initFirebase'
import { async } from '@firebase/util';

export default function AddList() {

  const [addBtn, setAddBtn] = React.useState(false)
  const [images, setImages] = React.useState([]);

  const maxNumber = 1;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };


  const onClickAddBtn = () => {
    setAddBtn(!addBtn)
  }
  const onFinish = (values) => {
      console.log('add:', values);
    // sendData(values)
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const { TextArea } = Input;

  return (
    <div className={Theme.surfaceAddPost}>
      <Button
        style={{
          width: '60px',
          height: '60px',
          backgroundColor: '#852541',
          borderColor: 'transparent',
        }}
        type="primary"
        shape="circle"
        icon={<PlusOutlined style={{ fontSize: '40px' }} />}
        onClick={onClickAddBtn}
      />
      {addBtn === true ? (
        <div
          style={{
            width: '450px',
            backgroundColor: '#000',
            borderRadius: '25px',
            paddingBottom: '30px',
            marginRight: '20px',
          }}
        >
          <Form
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Row>
              <Col span={8}>
                <Button
                  type="primary"
                  shape="circle"
                  style={{
                    backgroundColor: '#36332f',
                    border: '0',
                    margin: '20px',
                  }}
                  icon={
                    <CloseOutlined
                      style={{ color: '#fff', fontSize: '20px' }}
                    />
                  }
                />
              </Col>
              <Col span={8} offset={8}>
                <button type="submit" className={Theme.postBtn}>
                  <h2 style={{ margin: 0, color: '#fff' }}>Post</h2>
                </button>
              </Col>
            </Row>
            <Form.Item name="title">
              <Input
                placeholder="Story"
                style={{
                  backgroundColor: '#000',
                  border: '0',
                  color: '#767676',
                  fontSize: '28px',
                  fontWeight: 'bold',
                  margin: '0 30px',
                  width: '390px',
                }}
              />
            </Form.Item>

            <Form.Item name="subtitle">
              <TextArea
                placeholder="Write something you want to share?"
                style={{
                  backgroundColor: '#000',
                  border: 'none',
                  color: '#767676',
                  fontSize: '18px',
                  margin: '0 30px',
                  width: '390px',
                }}
                autoSize
              />
            </Form.Item>

            <Form.Item name="image">
              <ImageUploading
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
              >
                {({
                  onImageUpload,
                  onImageRemoveAll,
                  isDragging,
                  dragProps,
                }) => (
                  // write your building UI
                  <div>
                    {images.length != 1 ? (
                      <button
                        style={
                          isDragging
                            ? {
                                borderColor: '#b8abea',
                                background: 'transparent',
                                borderStyle: 'dotted',
                                borderRadius: '25px',
                                margin: '0 30px',
                              }
                            : {
                                margin: '0 30px',
                                border: '0',
                                background: 'transparent',
                              }
                        }
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        <Image
                          src={addPhoto}
                          alt="Picture of the author"
                          width="50px"
                          height="50px"
                        />
                      </button>
                    ) : (
                      <div className={Theme.imageContainer}>
                        <Image
                          className={Theme.image}
                          layout="fill"
                          // objectFit="contain"
                          style={{ position: 'absolute', zIndex: 1 }}
                          src={images[0].data_url}
                          alt="Picture of the author"
                          // width="390px"
                          // height="390px"
                        />
                        <Button
                          onClick={() => onImageRemoveAll()}
                          type="primary"
                          shape="circle"
                          style={{
                            backgroundColor: '#36332f',
                            border: '0',
                            margin: '20px',
                            position: 'absolute',
                            zIndex: 3,
                            top: '-5px',
                            right: '15px',
                          }}
                          icon={
                            <CloseOutlined
                              style={{ color: '#fff', fontSize: '20px' }}
                            />
                          }
                        />
                      </div>
                    )}
                  </div>
                )}
              </ImageUploading>
            </Form.Item>
          </Form>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}
