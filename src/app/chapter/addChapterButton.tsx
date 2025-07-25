// "use client";
// import { useCallback, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { X, Plus, CloudUpload } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useDropzone } from "react-dropzone";
// import Image from "next/image";
// import AddChurchModal from "./[slug]/churches/AddChurchModal";
// import AddPastorModal from "./[slug]/pastors/AddPastorModal";

// type AddChapterButtonProps = {
//   pastors: { id: number; name: string }[];
//   churches: { id: number; name: string }[];
//   onCancelAction: () => void;
// };

// export default function AddChapterButton({
//   pastors,
//   churches,
//   onCancelAction,
// }: AddChapterButtonProps) {
//   const router = useRouter();
//   const [isOpen, setIsOpen] = useState(false);
//   const [chapterName, setChapterName] = useState("");
//   const [description, setDescription] = useState("");
//   const [errors, setErrors] = useState({
//     chapterName: false,
//     description: false,
//   });
//   const characterLimit = 500;
//   const [dataURL, setDataURL] = useState<string | null>(null);
//   const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);

//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     setAcceptedFiles(acceptedFiles);
//     acceptedFiles.forEach((file) => {
//       const reader = new FileReader();
//       reader.onabort = () => console.log("file reading was aborted");
//       reader.onerror = () => console.log("file reading has failed");
//       reader.onload = () => {
//         const binaryStr = reader.result;
//         setDataURL(binaryStr as string);
//       };
//       reader.readAsDataURL(file);
//     });
//   }, []);

//   const { getRootProps, getInputProps } = useDropzone({ onDrop });
//   const selectedFile = acceptedFiles[0];

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const newErrors = {
//       chapterName: !chapterName.trim(),
//       description: !description.trim(),
//     };

//     setErrors(newErrors);

//     const hasErrors = Object.values(newErrors).some((error) => error);
//     if (!hasErrors) {
//       const slug = chapterName
//         .toLowerCase()
//         .replace(/\s+/g, "-")
//         .replace(/[^\w-]/g, "");

//       const newChapter = {
//         name: chapterName,
//         description,
//         image: "/images/chapter/ilochapter.webp", // or placeholder
//       };

//       // Save to localStorage
//       if (typeof window !== "undefined") {
//         const stored = localStorage.getItem("chapters");
//         const chapters = stored ? JSON.parse(stored) : {};
//         chapters[slug] = newChapter;
//         localStorage.setItem("chapters", JSON.stringify(chapters));
//       }

//       // Redirect
//       router.push(`/chapter/${slug}`);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-10 bg-black/35 flex items-center justify-center">
//       <div className="bg-white z-50 rounded-lg shadow-lg w-full max-w-lg sm:max-w-xl md:max-w-2xl h-full max-h-[90vh] p-6 mx-2 flex flex-col overflow-auto">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
//           Add Chapter
//         </h2>

//         {/* Chapter Name */}
//         <div className="space-y-4">
//           <div>
//             <label className="text-sm font-medium text-gray-700">
//               Chapter Name
//             </label>
//             <Input
//               id="chapterName"
//               placeholder="Enter Chapter Name"
//               value={chapterName}
//               onChange={(e) => setChapterName(e.target.value)}
//               className="bg-[#F7F4F0]"
//             />
//             {errors.chapterName && (
//               <p className="text-red-500 text-xs mt-1">
//                 Chapter name is required.
//               </p>
//             )}
//           </div>

//           {/* Description */}
//           <div className="relative">
//             <label className="text-sm font-medium text-gray-700">
//               Description
//             </label>
//             <Textarea
//               placeholder="Enter Description"
//               className="h-28 pr-10 bg-[#F7F4F0]"
//               maxLength={characterLimit}
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//             <span className="absolute bottom-1 right-2 text-xs text-gray-400">
//               {description.length}/{characterLimit} Characters
//             </span>
//             {errors.description && (
//               <p className="text-red-500 text-xs mt-1">
//                 Description is required.
//               </p>
//             )}
//           </div>

//           {/* Pastor Selection */}
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-700">Pastors</label>
//             <div className="flex gap-2 items-center">
//               <select
//                 id="pastor"
//                 className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-500 bg-[#F7F4F0]"
//               >
//                 <option>Select pastor</option>
//                 {pastors.map((pastor) => (
//                   <option key={pastor.id}>{pastor.name}</option>
//                 ))}
//               </select>
//               <AddPastorModal />
//             </div>
//           </div>

//           {/* Church Selection */}
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-700">Church</label>
//             <div className="flex gap-2 items-center">
//               <select
//                 id="church"
//                 className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-500 bg-[#F7F4F0]"
//               >
//                 <option>Select church</option>
//                 {churches.map((church) => (
//                   <option key={church.id}>{church.name}</option>
//                 ))}
//               </select>
//               <AddChurchModal />
//             </div>
//           </div>

//           {/* Image Upload */}
//           <div className="flex flex-col w-full">
//             <label className="text-sm font-medium text-gray-700">
//               Upload Image
//             </label>
//             <div
//               className="flex flex-row items-center justify-center border rounded-lg w-full h-250 max-h-30 sm:h-40 md:h-48 px-2 sm:px-5 mx-auto relative"
//               {...getRootProps()}
//             >
//               <input {...getInputProps()} />
//               {!dataURL ? (
//                 <div className="h-20 max-h-40 flex flex-col items-center justify-center w-full min-h-25 sm:h-40 md:h-48 px-2 sm:px-5 mx-auto relative">
//                   <CloudUpload size={32} className="mb-1 text-[#6F4E37]" />
//                   <span className="font-medium text-sm text-[#6F4E37]">
//                     Drag & Drop your image
//                   </span>
//                   <div className="flex flex-col items-center">
//                     <p className="text-xs text-gray-500">or</p>
//                     <span className="underline text-xs text-[#6F4E37]">
//                       Browse files
//                     </span>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center mt-2 w-full relative">
//                   <X
//                     className="absolute top-1 right-1 bg-opacity-80 rounded-full p-1 shadow hover:bg-red-500 hover:text-white transition-colors z-10"
//                     color="white"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setDataURL(null);
//                       setAcceptedFiles([]);
//                     }}
//                     aria-label="Remove image"
//                   />
//                   <Image
//                     src={dataURL || ""}
//                     alt="Preview"
//                     width={400}
//                     height={160}
//                     className="w-full h-full object-contain max-h-20 sm:max-w-xs"
//                   />
//                   <span className="text-xs text-gray-500 mt-1 break-all text-center w-full">
//                     {selectedFile?.name || "No file selected"}
//                   </span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Footer Buttons */}
//           <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4 mb-auto bottom-0 left-0 right-0 px-4 py-4">
//             <Button
//               type="button"
//               onClick={handleSubmit}
//               className="flex-1 w-full bg-[#6F4E37] h-10 px-4 text-white hover:bg-[#A67B5B]"
//             >
//               Create Chapter
//             </Button>
//             <Button
//               variant="outline"
//               onClick={onCancelAction}
//               className="border-1 border-[#A67B5B]/25 bg-[#A67B5B]/10 w-full max-w-none text-black hover:bg-red-50"
//             >
//               Cancel
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
