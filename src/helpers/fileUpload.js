/*

*/


export const fileUpload = async( file ) => {
    if (!file) throw new Error('No existe archivo para subir.');
    // la url la sacamos de la documentacion de cloudinary
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dl56szd6v/upload';
    // usamos FormData es un objeto nativo de JavaScript que nos permite crear un objeto
    const formData = new FormData();
    // definimos el upload_preset que usaremos en cloudinary
    // se guardaran las imagenes segun la carpeta que se defina en el upload_preset
    formData.append('upload_preset', 'react-journal-app');
    formData.append('file', file);

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });
        if(!resp.ok) throw new Error('No se pudo subir imagen')
        const cloudResp = await resp.json();
        return cloudResp.secure_url;

    } catch (error) {
        throw new Error( error.message);
    }
}