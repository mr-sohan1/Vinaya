# **Vinaya – Luxury Perfume Store**

A modern, high-performance **React** e-commerce frontend that delivers a premium shopping experience with **infinite scrolling**, **dynamic category filtering**, and a **robust shopping cart system**.

---

## **<ins>Core React Features & Architecture</ins>**

### **Global State Management with Redux Toolkit**

To ensure scalable and predictable state management, the shopping cart is powered by **Redux Toolkit** instead of relying solely on React Context or prop drilling.

* **Cart Slice** – Centralized state for adding, removing, and updating cart items.
* **useSelector** – Retrieves cart items, total price, and item count from the global store.
* **useDispatch** – Dispatches cart actions while keeping UI components clean and focused on presentation.

### **Component-Based Architecture**

The application follows a modular and reusable component structure.

* Reusable components such as **ProductCard**, **ProductGrid**, **Navbar**, and **CartDrawer** improve maintainability and code organization.
* Product data flows from parent components to child components through **props**.
* Shared UI interactions, such as opening and closing the cart drawer from the navigation bar, are handled by **lifting state** to the closest common parent instead of storing temporary UI state in Redux.

---

## **<ins>React Hooks Used</ins>**

### **useState**

Used for managing local UI state, including:

* Active product category
* Dropdown visibility
* Loading indicator for infinite scrolling

### **useMemo**

Optimizes performance by memoizing expensive filtering and sorting operations, ensuring the product list is only recalculated when its dependencies change.

### **useEffect**

Handles side effects such as resetting the visible product count whenever the selected product category changes.

### **useRef**

Stores the **IntersectionObserver** instance without triggering unnecessary component re-renders.

### **useCallback**

Memoizes the observer callback function to prevent unnecessary observer recreation, improving the efficiency of the infinite scroll implementation.

---

## **<ins>UI / UX Highlights</ins>**

### **Infinite Scroll**

* Implemented using the native **IntersectionObserver API**.
* Automatically loads additional products as users scroll.
* Provides a seamless browsing experience without traditional pagination.

### **Dynamic Grid Transitions**

* Changing the React **key** prop forces the product grid to remount.
* Smooth CSS fade-in animations create polished transitions when switching categories.

### **Premium Dark Theme**

* Modern, elegant, and high-contrast interface.
* Built using **CSS Variables** for consistent styling and easy theme maintenance.

---

## **<ins>Tech Stack</ins>**

* **React.js**
* **Redux Toolkit**
* **JavaScript (ES6+)**
* **CSS3**
* **IntersectionObserver API**
* **React Hooks**
