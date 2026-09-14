"use client"

import React, { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

interface RotatingEarthProps {
  width?: number
  height?: number
  className?: string
}

export default function RotatingEarth({ width = 800, height = 600, className = "" }: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState("")
  
  const targetLocationRef = useRef<{lat: number, lng: number} | null>(null)
  const rotationTargetRef = useRef<[number, number] | null>(null)
  const buyerLocationsRef = useRef<{lat: number, lng: number}[]>([])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    
    setIsSearching(true)
    setSearchError("")
    
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1`)
      const data = await res.json()
      
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat)
        const lng = parseFloat(data[0].lon)
        targetLocationRef.current = { lat, lng }
        rotationTargetRef.current = [lng, lat]
      } else {
        setSearchError("Location not found.")
      }
    } catch (err) {
      setSearchError("Search failed. Try again.")
    } finally {
      setIsSearching(false)
    }
  }

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    if (!context) return

    const containerWidth = Math.min(width, window.innerWidth - 40)
    const containerHeight = Math.min(height, window.innerHeight - 100)
    const radius = Math.min(containerWidth, containerHeight) / 2.5

    const dpr = window.devicePixelRatio || 1
    canvas.width = containerWidth * dpr
    canvas.height = containerHeight * dpr
    canvas.style.width = `${containerWidth}px`
    canvas.style.height = `${containerHeight}px`
    context.scale(dpr, dpr)

    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90)

    const path = d3.geoPath().projection(projection).context(context)

    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point
      let inside = false

      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i]
        const [xj, yj] = polygon[j]

        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside
        }
      }

      return inside
    }

    const pointInFeature = (point: [number, number], feature: any): boolean => {
      const geometry = feature.geometry

      if (geometry.type === "Polygon") {
        const coordinates = geometry.coordinates
        if (!pointInPolygon(point, coordinates[0])) {
          return false
        }
        for (let i = 1; i < coordinates.length; i++) {
          if (pointInPolygon(point, coordinates[i])) {
            return false 
          }
        }
        return true
      } else if (geometry.type === "MultiPolygon") {
        for (const polygon of geometry.coordinates) {
          if (pointInPolygon(point, polygon[0])) {
            let inHole = false
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) {
                inHole = true
                break
              }
            }
            if (!inHole) {
              return true
            }
          }
        }
        return false
      }

      return false
    }

    const generateDotsInPolygon = (feature: any, dotSpacing = 16) => {
      const dots: [number, number][] = []
      const bounds = d3.geoBounds(feature)
      const [[minLng, minLat], [maxLng, maxLat]] = bounds

      const stepSize = dotSpacing * 0.08

      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point: [number, number] = [lng, lat]
          if (pointInFeature(point, feature)) {
            dots.push(point)
          }
        }
      }

      return dots
    }

    interface DotData {
      lng: number
      lat: number
      visible: boolean
    }

    const allDots: DotData[] = []
    let landFeatures: any

    const render = () => {
      context.clearRect(0, 0, containerWidth, containerHeight)

      const currentScale = projection.scale()
      const scaleFactor = currentScale / radius

      context.beginPath()
      context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI)
      context.fillStyle = "#000000"
      context.fill()
      context.strokeStyle = "#ffffff"
      context.lineWidth = 2 * scaleFactor
      context.stroke()

      if (landFeatures) {
        const graticule = d3.geoGraticule()
        context.beginPath()
        path(graticule())
        context.strokeStyle = "#ffffff"
        context.lineWidth = 1 * scaleFactor
        context.globalAlpha = 0.25
        context.stroke()
        context.globalAlpha = 1

        context.beginPath()
        landFeatures.features.forEach((feature: any) => {
          path(feature)
        })
        context.strokeStyle = "#ffffff"
        context.lineWidth = 1 * scaleFactor
        context.stroke()

        allDots.forEach((dot) => {
          const projected = projection([dot.lng, dot.lat])
          if (
            projected &&
            projected[0] >= 0 &&
            projected[0] <= containerWidth &&
            projected[1] >= 0 &&
            projected[1] <= containerHeight
          ) {
            context.beginPath()
            context.arc(projected[0], projected[1], 1.2 * scaleFactor, 0, 2 * Math.PI)
            context.fillStyle = "#999999"
            context.fill()
          }
        })
      }

      buyerLocationsRef.current.forEach(loc => {
        const projected = projection([loc.lng, loc.lat])
        if (projected) {
          const time = Date.now()
          const pulse1 = (time % 2000) / 2000
          const pulse2 = ((time + 1000) % 2000) / 2000
          const maxRadius = 30 * scaleFactor
          
          context.beginPath()
          context.arc(projected[0], projected[1], 3 * scaleFactor, 0, 2 * Math.PI)
          context.fillStyle = "#a855f7"
          context.fill()
          
          context.beginPath()
          context.arc(projected[0], projected[1], pulse1 * maxRadius, 0, 2 * Math.PI)
          context.strokeStyle = `rgba(168, 85, 247, ${1 - pulse1})`
          context.lineWidth = 1.5 * scaleFactor
          context.stroke()
          
          context.beginPath()
          context.arc(projected[0], projected[1], pulse2 * maxRadius, 0, 2 * Math.PI)
          context.strokeStyle = `rgba(168, 85, 247, ${1 - pulse2})`
          context.lineWidth = 1.5 * scaleFactor
          context.stroke()
        }
      })

      if (targetLocationRef.current) {
        const { lat, lng } = targetLocationRef.current
        const projected = projection([lng, lat])
        
        if (projected) {
          const time = Date.now()
          const pulse1 = (time % 2000) / 2000
          const pulse2 = ((time + 1000) % 2000) / 2000
          const maxRadius = 40 * scaleFactor
          
          context.beginPath()
          context.arc(projected[0], projected[1], 4 * scaleFactor, 0, 2 * Math.PI)
          context.fillStyle = "#00d2ff"
          context.fill()
          
          context.beginPath()
          context.arc(projected[0], projected[1], pulse1 * maxRadius, 0, 2 * Math.PI)
          context.strokeStyle = `rgba(0, 210, 255, ${1 - pulse1})`
          context.lineWidth = 2 * scaleFactor
          context.stroke()
          
          context.beginPath()
          context.arc(projected[0], projected[1], pulse2 * maxRadius, 0, 2 * Math.PI)
          context.strokeStyle = `rgba(0, 210, 255, ${1 - pulse2})`
          context.lineWidth = 2 * scaleFactor
          context.stroke()
        }
      }
    }

   const loadWorldData = async () => {
      try {
        setIsLoading(true)

        // Using a stable jsDelivr CDN to bypass GitHub's raw content restrictions
        const response = await fetch(
          "https://cdn.jsdelivr.net/gh/johan/world.geo.json@master/countries.geo.json"
        )
        
        if (!response.ok) throw new Error("Failed to load land data")

        landFeatures = await response.json()

        landFeatures.features.forEach((feature: any) => {
          const dots = generateDotsInPolygon(feature, 16)
          dots.forEach(([lng, lat]) => {
            allDots.push({ lng, lat, visible: true })
          })
        })

        render()
        setIsLoading(false)
      } catch (err) {
        setError("Failed to load land map data")
        setIsLoading(false)
      }
    }

    const loadBuyerLocations = async () => {
      try {
        const res = await fetch("/api/map-data")
        const orders = await res.json()
        
        const coords = []
        for (const order of orders) {
          const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${order.city},${order.country}&format=json&limit=1`)
          const geoData = await geoRes.json()
          if (geoData && geoData.length > 0) {
            coords.push({ lat: parseFloat(geoData[0].lat), lng: parseFloat(geoData[0].lon) })
          }
          await new Promise(r => setTimeout(r, 1200))
        }
        buyerLocationsRef.current = coords
      } catch (err) {
        console.error(err)
      }
    }

    const rotation = [0, 0]
    let autoRotate = true
    const rotationSpeed = 0.5

    const rotate = () => {
      if (rotationTargetRef.current) {
        const targetRot = [-rotationTargetRef.current[0], -rotationTargetRef.current[1]]
        
        let diff = (targetRot[0] - rotation[0]) % 360
        if (diff > 180) diff -= 360
        if (diff < -180) diff += 360
        
        rotation[0] += diff * 0.05
        rotation[1] += (targetRot[1] - rotation[1]) * 0.05
        
        if (Math.abs(diff) < 0.1 && Math.abs(targetRot[1] - rotation[1]) < 0.1) {
          rotationTargetRef.current = null
        }
        projection.rotate(rotation as [number, number, number])
      } else if (autoRotate) {
        rotation[0] += rotationSpeed
        projection.rotate(rotation as [number, number, number])
      }
      
      render()
    }

    const rotationTimer = d3.timer(rotate)

    const handleMouseDown = (event: MouseEvent) => {
      autoRotate = false
      rotationTargetRef.current = null
      const startX = event.clientX
      const startY = event.clientY
      const startRotation = [...rotation]

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const sensitivity = 0.5
        const dx = moveEvent.clientX - startX
        const dy = moveEvent.clientY - startY

        rotation[0] = startRotation[0] + dx * sensitivity
        rotation[1] = startRotation[1] - dy * sensitivity
        rotation[1] = Math.max(-90, Math.min(90, rotation[1]))

        projection.rotate(rotation as [number, number, number])
      }

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)

        setTimeout(() => {
          autoRotate = true
        }, 10)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault()
      const scaleFactor = event.deltaY > 0 ? 0.9 : 1.1
      const newRadius = Math.max(radius * 0.5, Math.min(radius * 3, projection.scale() * scaleFactor))
      projection.scale(newRadius)
    }

    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("wheel", handleWheel)

    loadWorldData()
    loadBuyerLocations()

    return () => {
      rotationTimer.stop()
      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("wheel", handleWheel)
    }
  }, [width, height])

  if (error) {
    return (
      <div className={`dark flex items-center justify-center bg-card rounded-2xl p-8 ${className}`}>
        <div className="text-center">
          <p className="dark text-destructive font-semibold mb-2">Error loading Earth visualization</p>
          <p className="dark text-muted-foreground text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative flex justify-center items-center ${className}`}>
      
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-full max-w-sm px-4">
        <form onSubmit={handleSearch} className="relative flex items-center shadow-2xl shadow-black/50 rounded-full">
          <input
            type="text"
            placeholder="Search country or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111111]/80 backdrop-blur-md text-white text-sm px-5 py-3 rounded-full border border-white/10 focus:outline-none focus:border-[#00d2ff]/50 transition-colors"
          />
          <button 
            type="submit"
            disabled={isSearching}
            className="absolute right-2 bg-white text-black text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-gray-200 disabled:opacity-50 transition-colors"
          >
            {isSearching ? "..." : "Locate"}
          </button>
        </form>
        {searchError && (
          <p className="absolute w-full text-red-400 text-xs text-center mt-2 font-medium">{searchError}</p>
        )}
      </div>

      <canvas
        ref={canvasRef}
        className="max-w-full h-auto rounded-2xl bg-[#050505] cursor-grab active:cursor-grabbing"
      />
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-white/50 tracking-[0.2em] uppercase px-4 py-2 border border-white/10 rounded-full bg-black/40 backdrop-blur-md pointer-events-none">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  )
}