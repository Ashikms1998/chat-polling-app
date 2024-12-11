// import React, { useState } from "react";

// const PollModal = ({ onClose, onSubmit }) => {
//   const [question, setQuestion] = useState("");
//   const [options, setOptions] = useState(["", ""]);

//   const handleAddOption = () => {
//     setOptions([...options, ""]);
//   };

//   const handleOptionChange = (index, value) => {
//     const newOptions = [...options];
//     newOptions[index] = value;
//     setOptions(newOptions);
//   };

//   const handleSubmit = () => {
//     if (question.trim() && options.some((opt) => opt.trim())) {
//       onSubmit({ question, options });
//       onClose();
//     } else {
//       alert("Please provide a question and at least one option.");
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-md w-96">
//         <h2 className="text-lg font-bold mb-4">Create a Poll</h2>
//         <input
//           type="text"
//           placeholder="Poll Question"
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//           className="w-full p-2 mb-4 border rounded-md"
//         />
//         {options.map((option, index) => (
//           <input
//             key={index}
//             type="text"
//             // placeholder={Option ${index + 1}}
//             value={option}
//             onChange={(e) => handleOptionChange(index, e.target.value)}
//             className="w-full p-2 mb-2 border rounded-md"
//           />
//         ))}
//         <button
//           onClick={handleAddOption}
//           className="px-3 py-1 bg-gray-200 rounded-md mb-4"
//         >
//           Add Option
//         </button>
//         <div className="flex justify-end gap-2">
//           <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md">
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             className="px-4 py-2 bg-blue-500 text-white rounded-md"
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PollModal;



import React, { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

function PollModal({ isOpen, onClose, onCreatePoll }) {
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(['', ''])

  const handleAddOption = () => {
    setOptions([...options, ''])
  }

  const handleRemoveOption = (index) => {
    setOptions(options.filter((_, i) => i !== index))
  }

  const handleOptionChange = (index, value) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const handleCreatePoll = () => {
    if (question && options.filter(Boolean).length >= 2) {
      onCreatePoll(question, options.filter(Boolean))
      setQuestion('')
      setOptions(['', ''])
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a Poll</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Ask a question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
              {index > 1 && (
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleRemoveOption(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button variant="outline" onClick={handleAddOption}>
            Add Option
          </Button>
        </div>
        <Button onClick={handleCreatePoll}>Create Poll</Button>
      </DialogContent>
    </Dialog>
  )
}

export default PollModal;