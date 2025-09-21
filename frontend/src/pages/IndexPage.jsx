import { useEffect, useState } from "react"; 
import api from "../lib/axios.js";
import { toast } from "react-hot-toast";

import NotesNotesFound from "../components/NotesNotFound.jsx";
import Navbar from "../components/Navbar.jsx";
import RateLimitedUI from "../components/RateLimitedUI.jsx";
import NoteCard from "../components/NoteCard.jsx";


const HomePage = () => {

  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);  
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchNotes = async () => {
      try{
        // Fetch notes from the backend
        const res = await api.get("/notes");
        console.log(res.data);
        // Update state with fetched notes
        setNotes(res.data);
        // If fetch is successful, ensure rate limit UI is not shown
        setIsRateLimited(false);
      }
      catch(error){
        console.log("error response ##########",error.response.status);
        console.log("Error fetching notes:",error);
        if (error.response.status === 429) {
          console.log("Rate limit exceeded!!!!!!!!!!!!!");
          setIsRateLimited(true);
        }else {
          toast.error("Failed to load notes", error)
        }
      }
      finally{
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return <div className="min-h-screen">
    <Navbar/>
    {isRateLimited && <RateLimitedUI/>}

    <div className="max-w-7xl mx-auto p-4 mt-6">
      {loading && <div className="text-center text-primary py-10">Loading notes ...</div>}
      {notes.length === 0 && !loading && !isRateLimited && <NotesNotesFound />}
      {notes.length > 0 && !isRateLimited && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
          {notes.map(note => (
           <NoteCard key={note._id} note={note} setNotes={setNotes} />
          ))}
        </div>
      )}

    </div>
  </div>;
};

export default HomePage;
