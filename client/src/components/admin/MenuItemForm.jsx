import React, { useState, useEffect, useRef } from 'react';

function MenuItemForm({ onSubmit, initialData = null, isLoading, error }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('ፍስክ');
    const [availabilityNote, setAvailabilityNote] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [currentImageUrl, setCurrentImageUrl] = useState(null);
    const [removeCurrentImage, setRemoveCurrentImage] = useState(false);

    const fileInputRef = useRef(null);

    useEffect(() => {
        if (initialData) {
            setName(initialData.name || '');
            setDescription(initialData.description || '');
            setPrice(initialData.price != null ? String(initialData.price) : '');
            setCategory(initialData.category || 'ፍስክ');
            setAvailabilityNote(initialData.availabilityNote || '');
            setCurrentImageUrl(initialData.imageUrl || null);
            setImagePreview(initialData.imageUrl || null);
            setRemoveCurrentImage(false);
        } else {
            setName('');
            setDescription('');
            setPrice('');
            setCategory('ፍስክ');
            setAvailabilityNote('');
            setCurrentImageUrl(null);
            setImagePreview(null);
            setRemoveCurrentImage(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    }, [initialData]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => { setImagePreview(reader.result); };
            reader.readAsDataURL(file);
            setRemoveCurrentImage(false);
        } else {
            setImagePreview(currentImageUrl);
        }
    };

    const handleRemoveImageToggle = (e) => {
        setRemoveCurrentImage(e.target.checked);
        if (e.target.checked) {
            setImagePreview(null);
            if (fileInputRef.current) { fileInputRef.current.value = ""; }
        } else {
            setImagePreview(currentImageUrl);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLoading) return;

        const priceRegex = /^[0-9]+(\.[0-9]{1,2})?$/;
        if (!price || !priceRegex.test(price.trim())) {
            alert("Please enter a valid positive price (e.g., 150 or 150.50).");
            return;
        }

        const priceNumber = parseFloat(price.trim());

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', priceNumber);
        formData.append('category', category);
        formData.append('availabilityNote', availabilityNote || '');

        const imageFile = fileInputRef.current?.files[0];
        if (removeCurrentImage) {
            formData.append('removeImage', 'true');
        } else if (imageFile) {
            formData.append('imageFile', imageFile);
        }

        onSubmit(formData);
    };

    const categories = ['ፍስክ', 'ጾም', 'መጠጥ'];

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-md" role="alert">
                    {error}
                </div>
            )}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" id="name" value={name} required onChange={(e) => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" disabled={isLoading}/>
            </div>
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <select id="category" value={category} required onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md bg-white" disabled={isLoading}>
                    {categories.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
                </select>
            </div>
            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (Birr)</label>
                <input
                    type="text"
                    id="price"
                    value={price}
                    required
                    inputMode="decimal"
                    placeholder="e.g., 150.50"
                    onChange={(e) => setPrice(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    disabled={isLoading}
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea id="description" value={description} rows={3} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" disabled={isLoading}></textarea>
            </div>
            <div>
                <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700 mb-1">Image (Optional)</label>
                {imagePreview && !removeCurrentImage && ( <div className="mb-2"> <img src={imagePreview} alt="Preview" className="h-24 w-auto object-contain rounded border p-1"/> </div> )}
                <input type="file" id="imageFile" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 disabled:opacity-50" disabled={isLoading || removeCurrentImage}/>
                {initialData && currentImageUrl && ( <div className="mt-2 flex items-center"> <input id="removeImage" type="checkbox" checked={removeCurrentImage} onChange={handleRemoveImageToggle} className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500" disabled={isLoading}/> <label htmlFor="removeImage" className="ml-2 block text-sm text-gray-900"> Remove current image </label> </div> )}
            </div>
            <div>
                <label htmlFor="availabilityNote" className="block text-sm font-medium text-gray-700">Availability Note (Optional)</label>
                <input type="text" id="availabilityNote" value={availabilityNote} onChange={(e) => setAvailabilityNote(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="e.g., Only on weekends" disabled={isLoading}/>
            </div>
            <div className="pt-2">
                <button type="submit" disabled={isLoading} className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50">
                    {isLoading ? 'Saving...' : (initialData ? 'Update Item' : 'Add Item')}
                </button>
            </div>
        </form>
    );
}

export default MenuItemForm;
