<?php
declare(strict_types=1);
namespace App\Http\Controllers;

use App\Services\PaymentService;
use App\Services\HoursService;
use App\Services\PaymentStatusService;
use App\Services\ReservationService;
use App\Services\ReservationStatusService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\RoomData;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ReservationController extends Controller
{
    public function add(RoomData $rd, ReservationStatusService $rs, PaymentStatusService $ps, PaymentService $psa)
    {
        $data = $rd->RoomNumber();
        $dataStatus = $rs->ReservStatus();
        $dataPaymenStatus = $ps->PaymentStatus();
        $dataPaymentAmount = $psa->Payment();
        return Inertia::render(
            'admin/reservationAdd',
            ['numberRoom' => $data, 'status_reserv' => $dataStatus, 'status_payment' => $dataPaymenStatus, 'payment_id' => $dataPaymentAmount]
        );
    }
    public function search(ReservationService $rs, Request $rq)
    {
        $data = $rs->searchReservation($rq);
        return Inertia::render('reservationSearch', ['reservationsData' => $data]);
    }
    public function searchId(ReservationService $rs, $id)
    {
        $data = $rs->searchReservationId($id);
        return response()->json(['reservationDataId' => $data]);
    }


    public function availabilityStartHours(Request $rq, HoursService $h)
    {
        $roomId = (int) $rq->query('room');
        $dateTime = $rq->query('date');
        $hoursAvailability = $h->DateTimesStartAvailable($roomId, $dateTime);
        return response()->json([
            'hours_start' => $hoursAvailability
        ]);
    }
    public function availabilityEndHours(Request $rq, HoursService $h)
    {
        $listHours = $rq->query('listHoursStart');
        $dateStart = $rq->query('hourStartSelected');
        $hoursAvailability = $h->DateTimesEndAvaible($listHours, $dateStart);
        return response()->json([
            'hours_end' => $hoursAvailability
        ]);
    }

    public function registerReservation(Request $rq, ReservationService $rs)
    {
        $data = $rq->only([
            'user_id',
            'room_id',
            'payment_id',
            'payment_status_id',
            'reservation_status_id',
            'customer',
            'reservation_date',
            'start_time',
            'end_time',
        ]);

        $res = $rs->registerReservation($data);

        return response()->json($res);
    }

    public function editReservation(Request $rq, ReservationService $rs, $id)
    {
        $service = $rs->updateReservation($rq, $id);
        // Se puede llamar json() porque response() devuelve la instancia de ResponseFactory
        // (resuelta por el contenedor de servicios), que tiene el método json().
        return response()->json($service);


        //Necesitamos que si no se genera actualizacion mandar un codigo de estado manualmente mas mensaje que indique que no se hizo ningun cambio
        //Si hay cambio mandar 200 

    }

    public function searchEdit(ReservationService $rs)
    {
        try {
            $data = $rs->searchReservationEdit();
            return response()->json(['reservationDataEditArray' => $data], 200);

        } catch (NotFoundHttpException $e) {
            return response()->json(['message' => $e->getMessage()], 404);

        } catch (\Throwable $e) {
            // por si ocurre un error real inesperado
            return response()->json(['message' => 'Error interno'], 500);
        }
    }
}
