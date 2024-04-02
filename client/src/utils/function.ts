const truncateDescription = (description: string, maxLength: number): string => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    } else {
      return description;
    }
  };

  
  export default truncateDescription