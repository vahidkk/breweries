# Submission Notes

Since it's not a good idea to show all the breweries (hundreds of them!) in the first page and there should be a pagination, I thought using an infinite scrolling load approach would work for this project. In terms of UX, letting users load more data by scrolling down would be more pleasant than providing a lot of page numbers at the bottom of the page . I have done many projects with the SWR fetching library (by vercel) in the past and here I'm trying to demonstrate the infinite loading feature of this great library. To be able to infinite load based on scrolling down, I also used react-infinite-scroll-component library .I created a custom hook ( ./src/hook/useInfinitePagination) to be able to create fetching batches every time a user scrolls down.
Each time a user scrolls down to load more data, a new batch of 35 items will be pushed into the data array, so we need to map the data twice, once for accessing all batches and once for accessing items inside each batches.

For some types of breweries, I used different colors to avoid having a boring list of items. For example for closed breweries I used Black color and 'text-decoration : line-through', grey color for 'planning' breweries and ...

Clicking on each brewery will open a modal window which shows related information of that brewery. I thought using modal instead of a new page for detailed information would be more interesting in terms of UX. In a real world project I would also provide a unique URL for each brewery so users can share it with other people. One drawback of using modal is the lack of having a unique URL address for that piece of information which might be needed in some cases.

Search component :
I deliberately chose to show the search result as a dropdown (instead of filtering current loaded items). By choosing an item from search dropdown items, only that item will be shown on the main list of items so users can click on it to see the modal window for more information about that brewery.
Any changes on filter checkboxes before or after using search box will affect the search result as well.

I've also mentioned some comments inside codes anywhere I thought codes might be unclear logically .
