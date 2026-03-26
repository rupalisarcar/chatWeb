import multer from "multer";
import path from "path";
import fs from 'fs';

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        const dir = path.join(process.cwd(), "uploads");

            // ✅ ensure folder exists
            if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir);
    },
    filename:(req, file,cb)=>{
        const uniqueSuffix = Date.now();
        cb(null,file.fieldname+'-'+uniqueSuffix+ '-' +file.originalname)
    }
})

const fileFilter = (req, file,cb) =>{
    console.log(file)
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }else{
        cb(new Error("Unsupported file type"), false)
    }
}
export const upload = multer({
    storage:storage,
    limits:{fileSize : 1024*1024*5}, // 5MB limit
    fileFilter: fileFilter
})