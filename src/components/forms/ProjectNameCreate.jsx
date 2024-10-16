import React, { useEffect, useRef, useState } from 'react'
import RightSideButton from '../right-side-button/RightSideButton'
import { useNavigate } from 'react-router-dom';
import { createProjectNameMaster, listsOfProjectCategories } from '../services/MasterService';
import LeftSideMenu from '../left-side-menu/LeftSideMenu';

const ProjectNameCreate = () => {
  const [project, setProject] = useState({
    projectName: '',
    projectCategoryName: ''
  });
  const [projectCategorySuggestion, setProjectCategorySuggestion] = useState([]);
  const [filteredSuggestion, setFilteredSuggestion] = useState([]);
  const [projectCategoryFocused, setProjectCategoryFocused] = useState(false);
  const [highlightedSuggestionProjectCategory, setHighlightedSuggestionProjectCategory] = useState(0);
  const inputRefs = useRef([]);
  const optionsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

    listsOfProjectCategories()
      .then(response => {
        console.log(response.data);
        setProjectCategorySuggestion(response.data);
      })
      .catch(error => {
        console.error(error);
      })
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));

    if (name === 'projectCategoryName') {
      const filtered = projectCategorySuggestion.filter(projectCategory =>
        projectCategory.projectCategoryName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestion(filtered);
      setProjectCategoryFocused(true);
      setHighlightedSuggestionProjectCategory(0); // Reset highlighted suggestion index
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setProject(prev => ({
      ...prev,
      projectCategoryName: suggestion.projectCategoryName
    }));
    setProjectCategoryFocused(false);
  };

  const handleKeyDown = (e, index) => {
    const key = e.key;
    if (key === 'Enter') {
      e.preventDefault();    // Prevent default form submission on Enter

      if (e.target.value.trim() !== '') {
        const nextField = index + 1;

        if (nextField < inputRefs.current.length){
          // Move to the next field if the current field is not the last one
          inputRefs.current[nextField].focus();
          inputRefs.current[nextField].setSelectionRange(0,0);
        } else if (e.target.name === 'projectCategoryName'){
          // Show confirmation dialog only if projectCategoryName is filled
          const userConfirmed = window.confirm('Do you want to confirm this submit?');
          if (userConfirmed) {
            if (index === inputRefs.current.length - 1){
              handleSubmit(e);
            }
          } else{
            e.preventDefault();
          }
        }
      } else if (projectCategoryFocused && filteredSuggestion.length > 0){
        // If suggestions are focused, select the highlighted suggestion
        const selectedItem = filteredSuggestion[highlightedSuggestionProjectCategory];
        setProject(prev => ({
          ...prev,
          projectCategoryName: selectedItem.projectCategoryName
        }));
        setProjectCategoryFocused(false);
      } 
    } else if (key === 'Backspace') {
      const input = inputRefs.current[index];
      const value = input.value;
      const cursorPosition = input.selectionStart;
      if (cursorPosition === 0 && value.length !== 0) {
        const prevField = index - 1;
        if (inputRefs.current[prevField]) {
          inputRefs.current[prevField]?.focus();
          inputRefs.current[prevField].setSelectionRange(0, 0);
          e.preventDefault();
        }
      } else if (e.target.value !== '') {
        return;
      } else {
        const prevField = index - 1;
        if (inputRefs.current[prevField]) {
          inputRefs.current[prevField].focus();
          inputRefs.current[prevField].setSelectionRange(0, 0);
          e.preventDefault();
        }
      }
    } else if (key === 'ArrowDown' && projectCategoryFocused) {
      e.preventDefault();
      setHighlightedSuggestionProjectCategory((prevIndex) =>
        prevIndex === filteredSuggestion.length - 1 ? 0 : prevIndex + 1
      );
    } else if (key === 'ArrowUp' && projectCategoryFocused) {
      e.preventDefault();
      setHighlightedSuggestionProjectCategory((prevIndex) =>
        prevIndex === 0 ? filteredSuggestion.length - 1 : prevIndex - 1
      );
    } else if (key === 'Tab') {
      e.preventDefault();
      setProjectCategoryFocused(false);
    } else if (key === 'Escape') {
      navigate('/');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createProjectNameMaster(project);
      console.log(response.data);
      // After the submit
      setProject({ projectName: '', projectCategoryName: '' });
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className='flex'>
        <LeftSideMenu />
        <form className='border border-slate-500 w-[45.5%] h-[15vh] absolute left-[44.5%]' onSubmit={handleSubmit}>
          <div className='text-sm pl-3 mt-4 flex'>
            <label htmlFor="projectName" className='w-[25%]'>Project Name</label>
            <span>:</span>
            <input type="text" id='projectName' name='projectName' value={project.projectName} onChange={handleInputChange} ref={input => inputRefs.current[0] = input} onKeyDown={(e) => handleKeyDown(e, 0)} className='w-[400px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 border-transparent focus:border' autoComplete='off' />
          </div>
          <div className='text-sm flex pl-3'>
            <label htmlFor="projectCategoryName" className='w-[25%]'>Under</label>
            <span>:</span>
            <input type="text" id='projectCategoryName' name='projectCategoryName' value={project.projectCategoryName} onChange={handleInputChange} ref={(input) => (inputRefs.current[1] = input)} onKeyDown={(e) => handleKeyDown(e, 1)} onFocus={(e) => {setProjectCategoryFocused(true); handleInputChange(e);}} onBlur={() => setProjectCategoryFocused(false)} className='w-[400px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 border-transparent focus:border' />
            {projectCategoryFocused && filteredSuggestion.length > 0 && (
              <div className='w-[40%] h-[92.7vh] border border-gray-500 bg-[#CAF4FF] z-10 absolute left-[372px] top-0'>
                <div className='text-left bg-[#003285] text-[13.5px] text-white pl-2'>
                  <p>List of Cost Categories</p>
                </div>
                <ul className='suggestions w-full h-[87vh] text-left text-sm mt-2' ref={optionsRef}>
                  {filteredSuggestion.map((projectCategory, index) => (
                    <li key={index} tabIndex={0} className={`pl-2 capitalize cursor-pointer hover:bg-yellow-200 ${highlightedSuggestionProjectCategory === index ? 'bg-yellow-200' : ''}`} onClick={() => handleSuggestionClick(projectCategory)} onMouseDown={(e) => e.preventDefault()}>
                      {projectCategory.projectCategoryName}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </form>
        <RightSideButton />
      </div>
    </>
  )
}

export default ProjectNameCreate;
