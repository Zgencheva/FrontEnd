export const ValidateImage = (image) => {
    if (!image) {
        return false;
    }
    const imageExtension = image.name.split('.').pop();
    console.log(imageExtension);
    if (imageExtension === 'jpg' || imageExtension === 'png' || imageExtension == 'jpeg') {
        return true;
    }
    return false
}