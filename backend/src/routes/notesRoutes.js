import express from "express"
import { createNote, deleteNote,getNoteById, getAllNotes, updateNote } from "../controllers/notesController.js"

const router = express.Router()


router.get('/', getAllNotes);

router.get('/:id', getNoteById);

router.post('/', createNote);

router.put('/:id', updateNote);

router.delete('/:id', deleteNote);

export default router;

//kiranshrestha2069_db_user nARcSVT7GQ2wBMeJ


//kiranshrestha2069_db_user nARcSVT7GQ2wBMeJ

//mongodb+srv://kiranshrestha2069_db_user:nARcSVT7GQ2wBMeJ@cluster0.eudojoz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0