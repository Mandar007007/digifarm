import streamlit as st
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
import base64
import cv2
MODEL = tf.keras.models.load_model('./potato_trained_models/1/')
TOMATO_MODEL = tf.keras.models.load_model('./tomato_trained_models/1')
PEEPER_MODEL = tf.keras.models.load_model('./pepper_trained_models/1')
class_names = ['Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy']
Tomato_classes = ['Tomato_healthy', 'Tomato_Spider_mites_Two_spotted_spider_mite', 'Tomato__Target_Spot', 'Tomato_Septoria_leaf_spot',
 'Tomato__Tomato_mosaic_virus', 'Tomato_Leaf_Mold', 'Tomato_Bacterial_spot', 'Tomato_Late_blight',
 'Tomato_Early_blight', 'Tomato__Tomato_YellowLeaf__Curl_Virus']
pepper_classes = ['pepper_healthy', 'pepper_bell_bacterial_spot']
st.set_page_config(
    layout="wide",
    page_title='plant disease detection',
)
st.title("Plant Disease Detection")
st.write("This application is detecting disease in three plants photato, tomato and pepper")
options = ["Select One Plant","Tomato", "Potato", "Pepper"]

    # Create a selectbox for the user to choose one option
selected_option = st.selectbox("Select Plant:", options)

# st.write("You selected:", selected_option)

uploaded_file = st.file_uploader("Choose an image...", type=["jpg", "png", "jpeg"])

def read_file_as_image(data)->np.array:
    image = np.array(data)
    image = cv2.resize(image, (256,256))
    return image

async def potato():
    if uploaded_file is not None:
        image = Image.open(uploaded_file)
        st.image(image, caption="Uploaded Image", width=250)
        image = read_file_as_image(image)
        image_batch = np.expand_dims(image, axis=0)

        image_batch = tf.convert_to_tensor(image_batch[:, :, :, :3])

        predictions = MODEL.predict(image_batch)
        predicted_class = class_names[np.argmax(predictions[0])]
        confidence = np.max(predictions[0])
        print("prediction", class_names[np.argmax(predictions)])
        st.write("Predicted Class : ", predicted_class, " Confidence Level : ", confidence*100)


async def tomato():
    if uploaded_file is not None:
        image = Image.open(uploaded_file)

        #
        st.image(image, caption="Uploaded Image", width=250)
        image_batch = read_file_as_image(image)
        image_batch = np.expand_dims(image_batch, axis=0)
        #
        image_batch = tf.convert_to_tensor(image_batch[:, :, :, :3])
        # image_batch = tf.image.resize(image_batch, (256, 256))
        # image_batch = np.expand_dims(image_batch, 0)
        predictions = TOMATO_MODEL.predict(image_batch)
        
        predicted_class = Tomato_classes[np.argmax(predictions[0])]
        confidence = np.max(predictions[0])
        print("prediction", Tomato_classes[np.argmax(predictions)])
        st.write("Predicted Class : ", predicted_class, " disease Level : ", confidence*100)


async def pepper():
    if uploaded_file is not None:
        image = Image.open(uploaded_file)

        #
        st.image(image, caption="Uploaded Image", width=250)
        image = read_file_as_image(image)

        image_batch = np.expand_dims(image, axis=0)
        # image_batch = image_batch.reshape((None, 256, 256, 3))
        # image_batch = tf.reshape(image_batch, (-1, 256, 256, 3, 1))
        # image_batch = tf.squeeze(image_batch)

        image_batch = tf.convert_to_tensor(image_batch[:, :, :, :3])


        # image_batch = tf.image.resize(image_batch, (256, 256))

        predictions = PEEPER_MODEL.predict(image_batch)
        predicted_class = pepper_classes[np.argmax(predictions[0])]
        confidence = np.max(predictions[0])
        print("prediction", pepper_classes[np.argmax(predictions)])
        st.write("Predicted Class : ", predicted_class)
        st.write("disease Level : ", confidence)

import asyncio

if __name__ == "__main__":
    # if st.button('Predict'):
    
        if selected_option == 'Potato':
            asyncio.run(potato())
        elif selected_option == 'Tomato':
            asyncio.run(tomato())
        elif selected_option == 'pepper':
                asyncio.run(pepper())
        else:
            st.write("not avalible")