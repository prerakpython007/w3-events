import { useRef, useEffect } from "react";
import * as THREE from "three";

const BackgroundShapes = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 14;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Helper function for creating wireframe shapes
    const createWireframeShape = (geometry: THREE.BufferGeometry, color: number) => {
      const material = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.4, // Keep solid appearance
      });
      const edges = new THREE.EdgesGeometry(geometry);
      return new THREE.LineSegments(edges, material);
    };

    const createFullOvalGeometry = () => {
      const points = [];
      for (let i = 0; i <= 50; i++) {
        const angle = (i / 50) * Math.PI * 2;
        points.push(new THREE.Vector2(Math.cos(angle) * 5, Math.sin(angle) * 1.5));
      }
      return new THREE.LatheGeometry(points);
    };

    const shapeGroup = new THREE.Group();

    const shapes = [
      createWireframeShape(new THREE.IcosahedronGeometry(5, 0), 0xff8c00),
      createWireframeShape(new THREE.TorusGeometry(5, 1, 16, 50), 0xff8c00),
      createWireframeShape(createFullOvalGeometry(), 0xff8c00),
      createWireframeShape(new THREE.BoxGeometry(5, 5, 5), 0xff8c00),
    ];

    shapes[0].position.set(-10, -2, 0);
    shapes[1].position.set(10, -3, 0);
    shapes[2].position.set(0, 5, -2);
    shapes[3].position.set(0, -8, 3);

    shapes.forEach(shape => shapeGroup.add(shape));
    scene.add(shapeGroup);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const animate = () => {
      requestAnimationFrame(animate);
      shapes.forEach(shape => {
        shape.rotation.x += 0.01;
        shape.rotation.y += 0.01;
      });
      renderer.render(scene, camera);
    };

    animate();

    const handleScroll = () => {
      const scrollY = window.scrollY;
      shapeGroup.rotation.y = scrollY * 0.01;
    };

    window.addEventListener("scroll", handleScroll);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />;
};

export default BackgroundShapes;




// import { useRef, useEffect } from "react";
// import * as THREE from "three";

// const BackgroundShapes = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     if (!canvasRef.current) return;

//     const canvas = canvasRef.current;
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     camera.position.z = 14;

//     const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);

//     // Helper function for creating wireframe shapes
//     const createWireframeShape = (geometry: THREE.BufferGeometry, color: number) => {
//       const material = new THREE.LineBasicMaterial({ color });
//       const edges = new THREE.EdgesGeometry(geometry);
//       return new THREE.LineSegments(edges, material);
//     };

//     // Proper Full 3D Oval Geometry using LatheGeometry
//     const createFullOvalGeometry = () => {
//       const points = [];
//       for (let i = 0; i <= 50; i++) {
//         const angle = (i / 50) * Math.PI * 2;
//         points.push(new THREE.Vector2(Math.cos(angle) * 5, Math.sin(angle) * 1.5));
//       }
//       return new THREE.LatheGeometry(points);
//     };

//     const shapes = [
//       createWireframeShape(new THREE.IcosahedronGeometry(5, 0), 0xff8c00), // Larger Icosahedron
//       createWireframeShape(new THREE.TorusGeometry(5, 1, 16, 50), 0xff8c00), // Larger Torus
//       createWireframeShape(createFullOvalGeometry(), 0xff8c00) // Proper Full Oval
//     ];

//     // Recenter and spread the shapes slightly downward
//     shapes[0].position.set(-10, -2, 0);
//     shapes[1].position.set(10, -3, 0);
//     shapes[2].position.set(0, 5, -2);

//     shapes.forEach(shape => scene.add(shape));

//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
//     scene.add(ambientLight);

//     const animate = () => {
//       requestAnimationFrame(animate);
//       shapes.forEach(shape => {
//         shape.rotation.x += 0.01;
//         shape.rotation.y += 0.01;
//       });
//       renderer.render(scene, camera);
//     };

//     animate();

//     // Scroll Interaction: Move camera and spin shapes based on scroll position
//     const handleScroll = () => {
//       const scrollY = window.scrollY;
//       shapes.forEach(shape => {
//         shape.rotation.x = scrollY * 0.01;
//         shape.rotation.y = scrollY * 0.01;
//       });
//       camera.position.y = scrollY * 0.01;
//       camera.position.z = 14 - scrollY * 0.005;
//     };

//     window.addEventListener("scroll", handleScroll);

//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />;
// };

// export default BackgroundShapes;
