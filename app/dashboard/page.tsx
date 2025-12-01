import RideMap from "@/components/app/RideMap";
import UserProfile from "@/components/app/UserProfile";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { LucideCar, LucideMapPin, LucideMapPinCheck } from "lucide-react";

export default async function Page({ searchParams }: { searchParams: Promise<{ pickup?: string }> }){
    const params = await searchParams;
    const pickupLocation = params?.pickup || "";

    return (
        <section className="relative w-full h-screen overflow-hidden">
            <RideMap pickup={pickupLocation}/>
            
            <div className="absolute top-0 left-0 right-0 inline-flex justify-between w-full p-2 z-10">
                <Card className="w-98 mt-4 ml-4">
                    <CardContent className="w-full flex flex-col gap-4">
                        <InputGroup className="">
                            <InputGroupInput
                                placeholder="Pickup location"
                                className="text-sm sm:text-base md:text-lg text-slate-700"
                                defaultValue={pickupLocation}
                            />
                            <InputGroupAddon align="inline-start">
                                <LucideMapPin/>
                            </InputGroupAddon>
                        </InputGroup>

                        <InputGroup className="">
                            <InputGroupInput
                                placeholder="Dropoff location"
                                className="text-sm sm:text-base md:text-lg"
                            />
                            <InputGroupAddon align="inline-start">
                                <LucideMapPinCheck className="text-green-700" />
                            </InputGroupAddon>
                        </InputGroup>
                    </CardContent>
                    <CardFooter className="m-0">
                        <Button className="w-full hover:scale-101 transition-all">
                            <LucideCar className="fill-current"/>
                            Find Rides</Button>
                    </CardFooter>
                </Card>
                <UserProfile/>
            </div>
        </section>
    )
}
