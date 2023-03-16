import Axios from 'axios';

export const saveImageToCloudinary = async (img) =>{
    const formData = new FormData();
    formData.append("file", img)
    formData.append("upload_preset", "visitAcity");
    const response = await Axios.post("https://api.cloudinary.com/v1_1/dllgr6ope/image/upload", formData);
    const result = await response.data.secure_url;
    return result;
}