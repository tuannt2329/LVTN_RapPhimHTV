import React, {useEffect, useState} from 'react';
import {Text, Modal, View} from 'react-native';
import {WebView} from 'react-native-webview';
import * as types from '../constants';

function DemoAnt(props) {
  var thoigianthuc = new Date();
  var thoigianxacthuc = thoigianthuc.getFullYear() + '-';
  if (thoigianthuc.getMonth() + 1 < 10) {
    thoigianxacthuc += '0';
  }
  thoigianxacthuc += thoigianthuc.getMonth() + 1 + '-';
  if (thoigianthuc.getDate() < 10) {
    thoigianxacthuc += '0';
  }
  thoigianxacthuc += thoigianthuc.getDate() + 'T';
  if (thoigianthuc.getHours() < 10) {
    thoigianxacthuc += '0';
  }
  thoigianxacthuc += thoigianthuc.getHours() + ':';
  if (thoigianthuc.getMinutes() < 10) {
    thoigianxacthuc += '0';
  }
  thoigianxacthuc += thoigianthuc.getMinutes() + ':';
  if (thoigianthuc.getSeconds() < 10) {
    thoigianxacthuc += '0';
  }
  thoigianxacthuc += thoigianthuc.getSeconds() + '.000Z';
  let a = '';
  const [url, setUrl] = useState(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    fetch(`${types.API}paypal/pay/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'tranlamviet17@gmail.com',
        TenFilm: 'Bloodshot',
        TenPhong: '1',
        TenGhe: ['A01'],
        ThoiGianChieu: '2020-06-15T09:00:00.000Z',
        ThoiGianDat: '2020-06-15T09:00:00.000Z',
        GiaVe: 55000,
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res.result);
        setUrl(res.result);
        setShow(true);
      })
      .catch(e => {
        console.log('catch get list film from home');
        console.log(e);
      });
  }, []);
  function _onNavigationStateChange(data) {
    if (data.error) {
      console.log('Loi Roi');
      setShow(false);
    } else {
      console.log('sucesss');
    }
  }
  return (
    <View>
      <Modal
        visible={show}
        onRequestClose={() => {
          setShow(false);
        }}>
        <WebView
          source={{
            uri: url,
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={false}
          onHttpError={syntheticEvent => {
            const {nativeEvent} = syntheticEvent;
            console.warn(
              'WebView received error status code: ',
              nativeEvent.statusCode,
            );
          }}
          renderError={errorName => console.log(errorName)}
          onNavigationStateChange={data => _onNavigationStateChange(data)}
        />
      </Modal>
    </View>
  );
}

export default DemoAnt;
