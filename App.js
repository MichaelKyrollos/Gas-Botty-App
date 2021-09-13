import React, { useState, useEffect } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  Image,
  /* 
  Platform, 
  Text, 
  StyleSheet */ 
} from "react-native";
import { Camera } from "expo-camera";
import { Button } from "react-native-paper";
import Constants from 'expo-constants';
import * as Location from 'expo-location';

const CameraStart = (props) => {
  const [cameraRef, setCameraRef] = useState(null);
  // set default camera as backward facing
  const [type, setType] = useState(Camera.Constants.Type.back);
const RecStart = (props) => {
  const [cameraRef, setCameraRef] = useState(null);
}


  return (
    
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      // close button to cancel the camera 
      onRequestClose={() => {
        props.setModalVisible();
      }}
    >
      <Camera
        style={{ flex: 2 }}
        ratio="1:1"
        type={type}
        ref={(ref) => {
          setCameraRef(ref);
        }}

      >



        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            justifyContent: "flex-end",
          }}
        >

          <View
            style={{
              backgroundColor: "black",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              icon="close"
              style={{ marginLeft: 12 }}
              mode="outlined"
              color="white"
              onPress={() => {
                props.setModalVisible();
              }}
            >
              Close
            </Button>
            <TouchableOpacity
              onPress={async () => {
                if (cameraRef) {
                  let photo = await cameraRef.takePictureAsync();

                  props.setImage(photo);
                  props.setModalVisible();
                }
              }}
            >


              <View
                // style for menu on camera
                style={{
                  borderWidth: 2,
                  borderRadius: 50,
                  borderColor: "white",
                  height: 50,
                  width: 50,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 16,
                  marginTop: 16,
                }}
              >
                <View
                  // style for capture button
                  style={{
                    borderWidth: 2,
                    borderRadius: 50,
                    borderColor: "white",
                    height: 40,
                    width: 40,
                    backgroundColor: "white",
                  }}
                ></View>
              </View>
            </TouchableOpacity>

            <Button
              // button for flipping camera
              icon="axis-z-rotate-clockwise"
              style={{ marginRight: 12 }}
              mode="outlined"
              color="white"
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              {type === Camera.Constants.Type.back ? "Front" : "Back "}
            </Button>
          </View>
        </View>

      </Camera>
    </Modal>
  );
};
export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [camera, setShowCamera] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
// const [showRectangle, setShowRectangle] = useState(false);
// const changeShape = (shape) => {
  // setShowRectangle(shape == 'Rectangle');
// };



  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          width: 400,
          height: 400,
          borderLeftWidth: 3,
          borderRightWidth: 3,
          borderBottomWidth: 3,
          borderTopWidth:3,
        }}
      >

        <Image
          /* setting captured image as Image so it can be used later as a background image */
          source={{ uri: image }}
          style={{
            width: '100%',
            height: '100%',
            justifyContent: "center",
            alignItems: "center",
            justifyContent: "space-between",

          }}
        />
      </View>

      <Button
        style={{ width: "30%", marginTop: 16 }}
        icon="camera"
        mode="contained"
        onPress={() => {
          setShowCamera(true);
          
        }}>
        Camera
      </Button>

      {
        camera && (
          <CameraStart
            showModal={camera}

            setModalVisible={() => setShowCamera(false)}
            /*set image result as the uri of the image */
            setImage={(result) => setImage(result.uri)}
          />

        )
      }
    </View >
  );
}