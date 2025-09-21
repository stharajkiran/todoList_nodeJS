import { use, useState, useEffect } from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import { ArrowLeftIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";


const NoteDetailPage = () => {
  // state to hold the fetched note
  const [note, setNote] = useState(null);
  // state to track if the note is being loaded
  const [loading, setLoading] = useState(true);
  // state to track if the note is being saved
  const[saving, setSaving] = useState(false);

  // React hooks to get the note ID from the URL parameters
  const { id } = useParams();
  const navigate = useNavigate();

  console.log("Note ID from URL:", id);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } 
      catch (error) {
        console.error("Error fetching note:", error);
        toast.error("Failed to load note");
      }
      finally {
        setLoading(false);
      }
    }
    fetchNote();
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  // function to handle saving the note
  // the updated note is in the `note` state once the setNote updates the state
  const handleSave = async () => {
    // check if the title or content is empty
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }
    // set saving state to true
    setSaving(true);

    try {
      // send a PUT request to update the note
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } 
    catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } 
    finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }
  console.log("Fetched note:", note);

  return (
  <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            {/* Back button */}
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            {/* Delete button*/}
            <button  onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>

              {/* Save button. Changes the text in the button depeding on the saving state */}
              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage